<template>
  <div v-if="combatStore.combatState" class="combat-container">
    <div v-if="!(combatStage === CombatStage.Setup)" class="unit-container">
      <CombatUnit
        v-for="unit in combatStore.combatState.units"
        :key="unit.name"
        :unit="unit"
        :style="unitStyle(unit)"
        @click="selectUnitForInfo(unit)"
      />
    </div>
    <div id="combat-grid" class="combat-grid">
      <div
        v-for="(tile, index) in combatStore.combatState.grid"
        :id="index == '0;0' ? 'combat-tile' : undefined"
        :key="index"
        class="combat-tile"
        :class="{
          'targeted-range': targetedRange.includes(tile),
          'origin-range': originRange.includes(tile),
        }"
        @click="handleTileClick(tile)"
      >
        {{ tile.coordinates.x }},{{ tile.coordinates.y }}
      </div>
    </div>
    <CombatBattlefieldInfo class="info-battlefield" />
    <CombatAbilities
      class="info-abilities"
      :unit="combatStore.currentTurnUnit"
      @select-ability="selectAbility"
    />
    <div class="player-info">
      <CombatUnitInfo
        v-if="showSelectedPlayer"
        v-model="showSelectedPlayer"
        :unit="selectedPlayer"
      />
    </div>
    <div class="enemy-info">
      <CombatUnitInfo
        v-if="showSelectedEnemy"
        v-model="showSelectedEnemy"
        :unit="selectedEnemy"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useCombatStore } from "@/stores/combat";
import { useGameStore } from "@/stores/game";
import {
  CombatSide,
  CombatStage,
  type CombatTile,
  type Unit,
} from "~/types/combat.types";
import type { Coordinates } from "~/types/general.types";
import {
  AbilityType,
  type Ability,
  type AbilityShape,
} from "~/types/ability.types";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();
const combatStore = useCombatStore();
const gameStore = useGameStore();

const showSelectedEnemy = ref(false);
const selectedEnemy = ref<Unit | null>(null);
const showSelectedPlayer = ref(false);
const selectedPlayer = ref<Unit | null>(null);

const combatStage = ref<CombatStage>(CombatStage.Setup);

// GRID INFO

// TODO Check if combat is over
// TODO Handle combat action ecenomy during turn

const gridHeight = ref(0);
const gridWidth = ref(0);
const tileHeight = ref(0);
const tileWidth = ref(0);

function calculateGridSize() {
  gridHeight.value = document.getElementById("combat-grid")?.clientHeight || 0;
  gridWidth.value = document.getElementById("combat-grid")?.clientWidth || 0;
  tileHeight.value = document.getElementById("combat-tile")?.clientHeight || 0;
  tileWidth.value = document.getElementById("combat-tile")?.clientWidth || 0;
}

function unitStyle(unit: Unit) {
  if (!unit.position) {
    throw new Error("Unit is missing position");
  }
  // TODO Handle 128 (sprite height/width) being different
  const heightOffset = (tileHeight.value - 128) / 2;
  const widthOffset = (tileWidth.value - 128) / 2;
  return {
    position: "absolute",
    top: `${tileHeight.value * unit.position.y + heightOffset + unit.position.y * 2}px`,
    left: `${tileWidth.value * unit.position.x + widthOffset + unit.position.x * 2}px`,
  };
}

function selectUnitForInfo(unit: Unit) {
  if (unit.isPlayer) {
    selectedPlayer.value = unit;
    showSelectedPlayer.value = true;
  } else {
    selectedEnemy.value = unit;
    showSelectedEnemy.value = true;
  }
}

// USING ABILITY
function selectAbility(ability: Ability) {
  if (selectedAbility.value?.id === ability.id) {
    selectedAbility.value = null;
  } else {
    selectedAbility.value = ability;
  }
}

const selectedAbility = ref<Ability | null>(null);
// Targeted
const selectedTarget = ref<CombatTile | null>(null);
// Shaped
const selectedOrigin = ref<CombatTile | null>(null);
const selectedShape = ref<AbilityShape | null>(null);

function handleTileClick(tile: CombatTile) {
  if (!selectedAbility.value) {
    return;
  }
  if (selectedAbility.value.abilityType === AbilityType.Targeted) {
    combatStore.useTargetedAbility(
      selectedAbility.value,
      combatStore.currentTurnUnit!,
      tile.coordinates
    );
  }
  if (selectedAbility.value.abilityType === AbilityType.Shaped) {
    if (!selectedOrigin.value) {
      selectedOrigin.value = tile;
      selectedShape.value = selectedAbility.value.shape!.shapes[0];
    } else {
      combatStore.useShapedAbility(
        selectedAbility.value,
        combatStore.currentTurnUnit!,
        selectedOrigin.value.coordinates
      );
      selectedOrigin.value = null;
      selectedShape.value = null;
    }
  }
  selectedAbility.value = null;
}

// HELPER FUNCTIONS

const targetedRange = computed(() => {
  if (
    !combatStore.combatState ||
    !selectedAbility.value ||
    !(selectedAbility.value.abilityType === AbilityType.Targeted)
  ) {
    return [];
  }
  const tilesInRange = [];
  const grid = Object.values(combatStore.combatState.grid);

  for (const tile of grid) {
    if (
      combatStore.isInRange(
        tile.coordinates,
        combatStore.currentTurnUnit!.position!,
        selectedAbility.value.target!.range
      )
    ) {
      tilesInRange.push(tile);
    }
  }
  return tilesInRange;
});

const originRange = computed(() => {
  if (
    !combatStore.combatState ||
    !selectedAbility.value ||
    !(selectedAbility.value.abilityType === AbilityType.Shaped) ||
    selectedAbility.value.shape!.originRange === 0 ||
    !selectedOrigin.value
  ) {
    return [];
  }
  const tilesInRange = [];
  const grid = Object.values(combatStore.combatState.grid);
  for (const tile of grid) {
    if (
      combatStore.isInRange(
        tile.coordinates,
        combatStore.currentTurnUnit!.position!,
        selectedAbility.value.shape!.originRange
      )
    ) {
      tilesInRange.push(tile);
    }
  }
  return tilesInRange;
});

function calculateDistance(
  coordinates1: Coordinates,
  coordinates2: Coordinates
) {
  const X = coordinates2.x - coordinates1.x;
  const Y = coordinates2.y - coordinates1.y;
  return Math.sqrt(X * X + Y * Y);
}

function calculateRange(origin: CombatTile) {}

/*
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
*/
// useEvent("Space", endTurn);

onMounted(() => {
  // Add event listeners
  // useEvent("Space", endTurn);
  // Place Units
  if (combatStore.combatState) {
    const player = combatStore.combatState.units.find(
      (units) => units.isPlayer
    );
    player!.position = { x: 0, y: 3 };
    const enemy = combatStore.combatState.units.find(
      (unit) => unit.side === CombatSide.Enemy
    );
    enemy!.position = { x: 10, y: 3 };
    combatStage.value = CombatStage.Ongoing;
  }
  calculateGridSize();
  // Handle window resize
  combatStore.startBattle();
});
</script>
<style lang="scss" scoped>
// GRID VIEW
.combat-container {
  height: 100%;
  width: 100%;
  background-image: url("/public/maps/Battlemap1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.combat-grid {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(7, 1fr);
}
.combat-tile {
  border: 1px solid var(--elevation4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.player-info {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: fit-content;
  display: flex;
  background-color: var(--elevation2);
}
.enemy-info {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: fit-content;
  display: flex;
  background-color: var(--elevation2);
}
.info-abilities {
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin-right: auto;
  margin-left: auto;
}
.info-battlefield {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  margin-right: auto;
  margin-left: auto;
}
.unit-container {
  position: absolute;
  height: 0px;
  width: 0px;
}
.targeted-range {
  background-color: rgba(255, 255, 255, 0.3);

  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
.origin-range {
  background-color: rgba(0, 0, 255, 0.3);

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 255, 0.4);
  }
}
.red {
  background-color: rgba(255, 0, 0, 0.3);

  cursor: pointer;
  &:hover {
    background-color: rgba(255, 0, 0, 0.4);
  }
}
</style>
