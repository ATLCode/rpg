<template>
  <div class="combat-container">
    <div class="combat-visual">
      <div
        v-for="(unit, index) in playerStore.playerGroup"
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
      </div>
      <ASpacer />
      <div
        v-for="(unit, index) in arenaGroup"
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
          <h1>{{ currentActionPoints }} / {{ maxActionPoints }}</h1>
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
  </div>
</template>
<script lang="ts" setup>
import { EffectType, type Ability } from "~/game/abilities";
import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useEvent } from "@/composables/keyEvent";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();

const arenaGroup = ref<Unit[]>([
  { currentHealth: 10, maxHealth: 10 },
  { currentHealth: 10, maxHealth: 10 },
]);

// Should we have "CombatState" reactive or ref object? Then after combat update stats etc?
// Would clear things up and make it clear with saving in mid combat.

enum PlayerView {
  Equipment = "Equipment",
  Inventory = "Inventory",
  Abilities = "Abilities",
  Stats = "Stats",
}

const selectedPlayerView = ref(PlayerView.Abilities);
const playerTurn = ref(true);
const selectedAbility = ref<Ability | undefined>(undefined);
const currentActionPoints = ref(3);
const maxActionPoints = 3;

function useAbility(target: Unit) {
  if (!playerTurn) {
    return;
  }
  if (!selectedAbility.value?.effects) {
    return;
  }
  if (
    !selectedAbility.value.cost ||
    !(currentActionPoints.value >= selectedAbility.value.cost)
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

  currentActionPoints.value -= selectedAbility.value.cost;
}

function endTurn() {
  if (!playerTurn.value) {
    return;
  }
  currentActionPoints.value = maxActionPoints;
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
