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
              v-if="playerStore.gameState === GameState.Combat"
              class="abilities-container"
            >
              <CardAbility
                v-for="ability in skillStore.activeAbilities"
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
        <AButton @click="playerStore.gameState = GameState.Normal"
          >Flee</AButton
        >
      </div>
      <div class="info-enemy">Enemy</div>
    </div>
    <ADialog v-model="combatStore.combatState.result.isOver" :persistent="true">
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
        <div>You will get {{ combatStore.combatState.rewards.drops }}</div>

        <AButton @click="combatStore.returnFromCombat">Continue</AButton>
      </div>
      <div v-else>
        <div>Ýou Lost!</div>

        <AButton @click="playerStore.gameState = GameState.Normal"
          >Continue</AButton
        >
      </div>
    </ADialog>
  </div>
</template>
<script lang="ts" setup>
import { EffectType, SkillId, abilities, type Ability } from "~/game/abilities";
import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useCombatStore } from "@/stores/combat";
import { useEvent } from "@/composables/keyEvent";
import { chooseRandomWeightedObject } from "~/utils/weight-calculation";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();
const combatStore = useCombatStore();

enum PlayerView {
  Equipment = "Equipment",
  Inventory = "Inventory",
  Abilities = "Abilities",
  Stats = "Stats",
}

const selectedPlayerView = ref(PlayerView.Abilities);
const selectedAbility = ref<Ability>(skillStore.activeAbilities[0]);

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
  if (!ability?.effects || !combatStore.combatState) {
    return;
  }
  if (!ability.cost || !(user.currentActionPoints >= ability.cost)) {
    return;
  }

  const effects = ability.effects;

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

  user.currentActionPoints -= ability.cost;
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
  }

  // Handle winner enemy
  if (enemyGroupHealth <= 0) {
    combatStore.combatState.result.isOver = true;
    combatStore.combatState.result.isWon = false;
  }
}

function handleUnitDeath(unit: Unit) {
  console.log("handling death");
  // If enemy add drops to combat rewards
  if (unit.drops && unit.currentHealth === 0) {
    const drop = chooseRandomWeightedObject(unit.drops);
    console.log(drop);
    combatStore.combatState?.rewards.drops.push(drop);
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
