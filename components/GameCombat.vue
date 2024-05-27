<template>
  <div class="combat-container">
    <div class="combat-visual">
      <div
        v-for="(unit, index) in combatState.playerGroup"
        :key="index"
        class="unit-card"
        @click="useAbility(unit)"
      >
        <div class="img-container">
          <img src="/icons/21.png" class="unit-img" alt="" />
        </div>
        <AProgressLinear
          v-model="unit.currentHealth"
          :max="unit.maxHealth"
          color="var(--error)"
        />
        <AButton
          v-if="
            combatState.playerGroupTurn &&
            combatState.currentTurn.unitIndex === index
          "
        />
      </div>
      <ASpacer />
      <div
        v-for="(unit, index) in combatState.enemyGroup"
        :key="index"
        class="unit-card"
        @click="useAbility(unit)"
      >
        <div class="img-container">
          <img src="/npcs/27.png" class="unit-img" alt="" />
        </div>
        <AProgressLinear
          v-model="unit.currentHealth"
          :max="unit.maxHealth"
          color="var(--error)"
        />
        <AButton
          v-if="
            !combatState.playerGroupTurn &&
            combatState.currentTurn.unitIndex === index
          "
        />
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
            {{ combatState.currentTurn.currentActionPoints }} /
            {{ combatState.currentTurn.maxActionPoints }}
          </h1>
        </div>
        <pre>{{ JSON.stringify(combatState, null, 4) }}</pre>
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
  </div>
</template>
<script lang="ts" setup>
import { EffectType, type Ability } from "~/game/abilities";
import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useEvent } from "@/composables/keyEvent";
import { useDeepCloneArray } from "@/composables/deepClone";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();

enum PlayerView {
  Equipment = "Equipment",
  Inventory = "Inventory",
  Abilities = "Abilities",
  Stats = "Stats",
}

const selectedPlayerView = ref(PlayerView.Abilities);
const selectedAbility = ref<Ability | undefined>(undefined);

const combatState = ref({
  playerGroup: useDeepCloneArray(playerStore.playerGroup),
  enemyGroup: [
    { currentHealth: 10, maxHealth: 10 },
    { currentHealth: 10, maxHealth: 10 },
  ],
  playerGroupTurn: true,
  currentTurn: {
    unitIndex: 0,
    currentActionPoints: 3,
    maxActionPoints: 3,
  },
});

function useAbility(target: Unit) {
  if (!combatState.value.currentTurn) {
    return;
  }
  if (!selectedAbility.value?.effects) {
    return;
  }
  if (
    !selectedAbility.value.cost ||
    !(
      combatState.value.currentTurn.currentActionPoints >=
      selectedAbility.value.cost
    )
  ) {
    return;
  }
  const effects = selectedAbility.value.effects;

  for (const effect of effects) {
    if (effect.effectType === EffectType.Damage) {
      console.log("Dealing Damage");
      target.currentHealth -= effect.value;
    }
    if (effect.effectType === EffectType.Heal) {
      console.log("Healing");
    }
  }

  combatState.value.currentTurn.currentActionPoints -=
    selectedAbility.value.cost;
}

function resetCurrentTurn(playerGroupTurn: boolean, nextIndex: number = 0) {
  combatState.value.currentTurn = {
    unitIndex: nextIndex,
    currentActionPoints: 3,
    maxActionPoints: 3,
  };
  combatState.value.playerGroupTurn = playerGroupTurn;
}

function endTurn() {
  const nextIndex = combatState.value.currentTurn.unitIndex + 1;
  if (nextIndex >= combatState.value.playerGroup.length) {
    console.log("Go to enemy turn");
    resetCurrentTurn(false);
    handleEnemyGroupTurn();
    return;
  }
  console.log("Next player turn");
  resetCurrentTurn(true, nextIndex);
}

async function handleEnemyGroupTurn() {
  console.log("Enemy turn");

  for (const enemy of combatState.value.enemyGroup) {
    if (enemy.currentHealth < 1) {
      continue;
    }
    combatState.value.playerGroup[0].currentHealth -= 1;
    await wait(500);
    combatState.value.currentTurn.unitIndex += 1;
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
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr;
}

.combat-visual {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  .unit-card {
    align-self: center;
    border: 1px solid var(--elevation2);
    height: 200px;
    width: 150px;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--error);
    }
  }
  .unit-img {
    height: 100%;
    width: 100%;
    object-fit: contain;
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
</style>
