<template>
  <div v-if="combatStore.combatState" class="combat-container">
    <div class="combat-visual">
      <div
        v-for="(unit, index) in combatStore.combatState.playerGroup"
        :key="index"
        class="unit-card-container"
        @click="
          useAbility(
            selectedAbility,
            combatStore.combatState.playerGroup[0],
            unit
          )
        "
      >
        <div class="unit-header">
          <div
            v-if="
              combatStore.combatState.playerGroupTurn &&
              combatStore.combatState.currentTurn.unitIndex === index
            "
            class="turn-indicator"
          >
            <img src="/assets/icons/chevron-down.svg" alt="" class="turn-img" />
          </div>
        </div>

        <CardUnit :unit="unit" />
      </div>
      <ASpacer />
      <div
        v-for="(unit, index) in combatStore.combatState.enemyGroup"
        :key="index"
        class="unit-card-container"
        @click="
          useAbility(
            selectedAbility,
            combatStore.combatState.playerGroup[0],
            unit
          )
        "
      >
        <div class="unit-header">
          <div
            v-if="
              !combatStore.combatState.playerGroupTurn &&
              combatStore.combatState.currentTurn.unitIndex === index
            "
            class="turn-indicator"
          >
            <img src="/assets/icons/chevron-down.svg" alt="" class="turn-img" />
          </div>
        </div>

        <CardUnit :unit="unit" />
      </div>
    </div>
    <div class="combat-info">
      <div class="info-player">
        <div class="player-tabs">
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Equipment }"
            @click="selectedPlayerView = PlayerView.Equipment"
            >EQ</AButton
          >
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Inventory }"
            @click="selectedPlayerView = PlayerView.Inventory"
            >IN</AButton
          >
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Abilities }"
            @click="selectedPlayerView = PlayerView.Abilities"
            >AB</AButton
          >
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Stats }"
            @click="selectedPlayerView = PlayerView.Stats"
            >ST</AButton
          >
        </div>
        <div class="player-view">
          <div
            v-if="selectedPlayerView === PlayerView.Equipment"
            class="tab-content"
          >
            <GameMenuGear />
          </div>
          <div
            v-if="selectedPlayerView === PlayerView.Inventory"
            class="tab-content"
          >
            <GameMenuInventory />
          </div>
          <div
            v-if="selectedPlayerView === PlayerView.Abilities"
            class="tab-content"
          >
            <div
              v-if="gameStore.gameState === GameState.Combat"
              class="abilities-container"
            >
              <CardAbility
                v-for="ability in skillStore.combatAbilities"
                :key="ability.name"
                :ability="ability"
                :selected-ability-id="selectedAbility?.id"
                class="abilities-container"
                @select-ability="selectedAbility = ability"
              />
            </div>
          </div>
          <div
            v-if="selectedPlayerView === PlayerView.Stats"
            class="tab-content"
          >
            <GameMenuSkills />
          </div>
        </div>
      </div>
      <div class="info-middle">
        <div class="middle-ap">
          <h1>
            {{ combatStore.combatState.playerGroup[0].currentActionPoints }}
            /
            {{ combatStore.combatState.playerGroup[0].maxActionPoints }}
          </h1>
        </div>
        <div class="extra-info">
          <pre>{{ JSON.stringify(combatStore.combatState, null, 4) }}</pre>
        </div>
        <AButton @click="endTurn" @keyup.space="endTurn">
          <div>End Turn</div>
          <div>(Space)</div>
        </AButton>
        <AButton @click="gameStore.gameState = GameState.Normal">Flee</AButton>
      </div>
      <div class="info-enemy">Enemy</div>
    </div>
    <AModal v-model="combatStore.combatState.result.isOver" :persistent="true">
      <div v-if="combatStore.combatState.result.isWon">
        <div>You Won!</div>
        <div>
          You gained {{ combatStore.combatState.rewards.meleeExp }} melee
          experience
        </div>
        <div>
          You gained {{ combatStore.combatState.rewards.rangedExp }} ranged
          experience
        </div>
        <div>
          You gained {{ combatStore.combatState.rewards.magicExp }} magic
          experience
        </div>
        <div>You will get</div>
        <div class="drops-container">
          <div
            v-for="(drop, index) in combatStore.combatState.rewards.drops"
            :key="index"
          >
            <div>
              {{ drop.gameItem.item.name }} - {{ drop.gameItem.itemId }}
            </div>
            <!--
            Need to fix ACheckbox to make below input to work
                <ACheckbox v-model="combatStore.combatState.rewards.selectedDrops" :value="drop"></ACheckbox>
            -->
            <input
              v-model="combatStore.combatState.rewards.selectedDrops"
              type="checkbox"
              :value="drop"
            />
          </div>
        </div>

        <AButton @click="combatStore.returnFromCombat">Continue</AButton>
      </div>
      <div v-else>
        <div>Ýou Lost!</div>

        <AButton @click="gameStore.gameState = GameState.Normal"
          >Continue</AButton
        >
      </div>
    </AModal>
  </div>
</template>
<script lang="ts" setup>
import { ulid } from "ulid";
import { abilities } from "~/game/abilities";
import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useCombatStore } from "@/stores/combat";
import { useGameStore } from "@/stores/game";
import { useEvent } from "@/composables/keyEvent";
import { chooseRandomWeightedObject } from "~/utils/weight-calculation";
import { EffectType, SkillId, type Ability } from "~/types/ability.types";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();
const combatStore = useCombatStore();
const gameStore = useGameStore();

enum PlayerView {
  Equipment = "Equipment",
  Inventory = "Inventory",
  Abilities = "Abilities",
  Stats = "Stats",
}

const selectedPlayerView = ref(PlayerView.Abilities);
const selectedAbility = ref<Ability>(skillStore.combatAbilities[0]);

const isPlayerTurn = computed(() => {
  if (
    combatStore.combatState?.playerGroupTurn &&
    combatStore.combatState.currentTurn.unitIndex === 0
  ) {
    return true;
  } else {
    return false;
  }
});

function useAbility(ability: Ability, user: Unit, target: Unit) {
  if (!ability?.combatDetails || !combatStore.combatState) {
    return;
  }
  if (
    !ability.combatDetails.actionPointCost ||
    !(user.currentActionPoints >= ability.combatDetails.actionPointCost)
  ) {
    return;
  }

  const effects = ability.combatDetails.effects;

  for (const effect of effects) {
    if (effect.effectType === EffectType.Damage) {
      console.log("Dealing Damage");
      target.currentHealth -= effect.value;
    }
    if (effect.effectType === EffectType.Heal) {
      console.log("Healing");
    }
  }

  if (user.isPlayer && ability.xp) {
    if (ability.skillId === SkillId.Melee) {
      combatStore.combatState.rewards.meleeExp += ability.xp;
    }
    if (ability.skillId === SkillId.Ranged) {
      combatStore.combatState.rewards.rangedExp += ability.xp;
    }
    if (ability.skillId === SkillId.Magic) {
      combatStore.combatState.rewards.magicExp += ability.xp;
    }
  }

  if (target.currentHealth <= 0) {
    target.currentHealth = 0;
  }

  handleUnitDeath(target);
  handleCombatOver();

  user.currentActionPoints -= ability.combatDetails.actionPointCost;
  if (user.currentActionPoints === 0 && isPlayerTurn.value) {
    endTurn();
  }
}

function handleCombatOver() {
  // Check if combat is over

  if (!combatStore.combatState) {
    return;
  }

  const playerGroupHealth = combatStore.combatState.enemyGroup.reduce(
    (acc, curr) => curr.currentHealth + acc,
    0
  );

  const enemyGroupHealth = combatStore.combatState.playerGroup.reduce(
    (acc, curr) => curr.currentHealth + acc,
    0
  );

  // Handle winner player
  if (playerGroupHealth <= 0) {
    combatStore.combatState.result.isOver = true;
    combatStore.combatState.result.isWon = true;
    combatStore.combatState.rewards.selectedDrops =
      combatStore.combatState.rewards.drops;
  }

  // Handle winner enemy
  if (enemyGroupHealth <= 0) {
    combatStore.combatState.result.isOver = true;
    combatStore.combatState.result.isWon = false;
  }

  // General stuff
  playerStore.playerGroup = combatStore.combatState.playerGroup;
}

function handleUnitDeath(unit: Unit) {
  console.log("handling death");
  // If enemy add drops to combat rewards
  if (unit.drops && unit.currentHealth === 0) {
    const drop = chooseRandomWeightedObject(unit.drops);
    console.log(drop);
    combatStore.combatState?.rewards.drops.push({
      id: ulid(),
      gameItem: drop,
    });
  }
}

function resetCurrentTurn(playerGroupTurn: boolean, nextIndex: number = 0) {
  if (!combatStore.combatState) {
    throw new Error("Can't find combat state");
  }

  combatStore.combatState.currentTurn = {
    unitIndex: nextIndex,
  };

  combatStore.combatState.enemyGroup.forEach((unit) => {
    unit.currentActionPoints = unit.maxActionPoints;
  });
  combatStore.combatState.playerGroup.forEach((unit) => {
    unit.currentActionPoints = unit.maxActionPoints;
  });

  combatStore.combatState.playerGroupTurn = playerGroupTurn;
}

function endTurn() {
  if (!combatStore.combatState) {
    throw new Error("Can't find combat state");
  }

  const nextIndex = combatStore.combatState.currentTurn.unitIndex + 1;
  if (nextIndex >= combatStore.combatState.playerGroup.length) {
    console.log("Go to enemy turn");
    resetCurrentTurn(false);
    handleEnemyGroupTurn();
    return;
  }
  console.log("Next player turn");
  resetCurrentTurn(true, nextIndex);
}

async function handleEnemyGroupTurn() {
  // process? simulate? run? etc instead of handle
  if (!combatStore.combatState) {
    throw new Error("Can't find combat state");
  }

  console.log("Enemy turn");

  for (const enemy of combatStore.combatState.enemyGroup) {
    if (enemy.currentHealth < 1 || enemy.abilities.length < 1) {
      continue;
    }

    useAbility(
      abilities[enemy.abilities[0]],
      enemy,
      combatStore.combatState.playerGroup[0]
    );

    await wait(500);
    combatStore.combatState.currentTurn.unitIndex += 1;
  }
  resetCurrentTurn(true);
}

useEvent("Space", endTurn);

onMounted(() => {
  // Add event listeners
  useEvent("Space", endTurn);
});
</script>
<style lang="scss" scoped>
.combat-container {
  max-height: 100vh;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr;
  overflow: hidden;
}

.combat-visual {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .unit-header {
    height: 50px;
  }
}

.combat-info {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  .info-player {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    .player-tabs {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
    }
    .player-view {
      height: 100%;
      .tab-content {
        height: 100%;
        width: 100%;
      }
    }
  }
}

.info-middle {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.extra-info {
  display: flex;
  max-height: 500px;
  overflow-y: scroll;
}

.activeTab {
  border: 2px var(--elevation4) solid;
}
.abilities-container {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.middle-ap {
  display: flex;
  justify-content: center;
}
.turn-indicator {
  height: 100%;
  width: 100%;
}
.turn-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
