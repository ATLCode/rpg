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
    <div
      id="combat-grid"
      class="combat-grid"
      :class="{
        'cast-ready': combatStore.selectedAbility && combatStore.selectedOrigin,
      }"
    >
      <div
        v-for="(tile, index) in combatStore.combatState.grid"
        :id="index == '0;0' ? 'combat-tile' : undefined"
        :key="index"
        class="combat-tile"
        :class="{
          'red-tiles': tileColors.redTiles.includes(tile),
          'white-tiles': tileColors.whiteTiles.includes(tile),
          'blue-tiles': tileColors.blueTiles.includes(tile),
        }"
        @click="handleTileClick(tile)"
      >
        <div v-if="false">
          {{ tile.coordinates.x }},{{ tile.coordinates.y }}
        </div>

        <CombatDrop :tile="tile" :coordinates="tile.coordinates" />
      </div>
    </div>
    <CombatBattlefieldInfo class="info-battlefield" />
    <CombatAbilities
      class="info-abilities"
      :unit="combatStore.currentTurnUnit"
      @select-ability="combatStore.selectAbility"
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
    <div v-if="combatStore.selectedAbility" class="info-text">
      <div>{{ combatStore.selectedAbility.name }} is selected</div>
      <div>Selected origin {{ combatStore.selectedOrigin }}</div>
      <div>Selected shape {{ combatStore.selectedShape }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCombatStore } from "@/stores/combat";
import {
  CombatSide,
  CombatStage,
  EffectType,
  type CombatTile,
  type Unit,
} from "~/types/combat.types";

const combatStore = useCombatStore();

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
  if (combatStore.selectedAbility && unit.position) {
    handleTileClick({ coordinates: unit.position });
    return;
  }
  if (unit.isPlayer) {
    selectedPlayer.value = unit;
    showSelectedPlayer.value = !showSelectedPlayer.value;
  } else {
    selectedEnemy.value = unit;
    showSelectedEnemy.value = !showSelectedEnemy.value;
  }
}

// USING ABILITY

function handleTileClick(tile: CombatTile) {
  if (
    !combatStore.selectedAbility ||
    !combatStore.currentTurnUnit ||
    !combatStore.currentTurnUnit.position
  ) {
    return;
  }
  if (combatStore.selectedAbility.target) {
    if (
      !combatStore.isInRange(
        tile.coordinates,
        combatStore.currentTurnUnit?.position,
        combatStore.selectedAbility.target?.range
      )
    ) {
      return;
    }
    combatStore.useTargetedAbility(
      combatStore.selectedAbility,
      combatStore.currentTurnUnit!,
      tile.coordinates
    );
  }
  if (combatStore.selectedAbility.shape) {
    if (!combatStore.selectedOrigin) {
      if (
        !combatStore.isInRange(
          tile.coordinates,
          combatStore.currentTurnUnit.position,
          combatStore.selectedAbility.shape?.originRange
        )
      ) {
        return;
      }
      combatStore.selectedOrigin = tile;
      combatStore.selectedShape = combatStore.selectedAbility.shape!.shapes[0];
      return;
    } else {
      combatStore.useShapedAbility(
        combatStore.currentTurnUnit!,
        combatStore.selectedOrigin.coordinates
      );
      combatStore.selectedOrigin = null;
      combatStore.selectedShape = null;
    }
  }
  combatStore.selectedAbility = null;
}

const tileColors = computed(() => {
  let blueTiles: CombatTile[] = [];
  const yellowTiles: CombatTile[] = [];
  const redTiles: CombatTile[] = [];
  let whiteTiles: CombatTile[] = [];
  const greenTiles: CombatTile[] = [];

  // BASIC CHECKS
  if (!combatStore.combatState || !combatStore.selectedAbility) {
    return {
      blueTiles,
      yellowTiles,
      redTiles,
      whiteTiles,
      greenTiles,
    };
  }

  // SHOW TARGET RANGE
  if (combatStore.selectedAbility.target) {
    const tilesInRange = [];
    const grid = Object.values(combatStore.combatState.grid);

    for (const tile of grid) {
      if (
        combatStore.isInRange(
          tile.coordinates,
          combatStore.currentTurnUnit!.position!,
          combatStore.selectedAbility.target!.range
        )
      ) {
        tilesInRange.push(tile);
      }
    }
    whiteTiles = whiteTiles.concat(tilesInRange);
  }

  // SHOW ORIGIN RANGE
  if (
    combatStore.selectedAbility.shape &&
    combatStore.selectedAbility.shape.originRange &&
    !(combatStore.selectedAbility.shape.originRange === 0) &&
    !combatStore.selectedOrigin
  ) {
    const tilesInRange = [];
    const grid = Object.values(combatStore.combatState.grid);
    for (const tile of grid) {
      if (
        combatStore.isInRange(
          tile.coordinates,
          combatStore.currentTurnUnit!.position!,
          combatStore.selectedAbility.shape!.originRange
        )
      ) {
        tilesInRange.push(tile);
      }
    }

    blueTiles = blueTiles.concat(tilesInRange);
  }

  // SHOW SHAPED

  if (
    combatStore.selectedShape &&
    combatStore.selectedAbility.shape &&
    combatStore.selectedOrigin
  ) {
    const origin = combatStore.selectedOrigin;
    const shape = combatStore.selectedShape;

    for (let index = 0; index < shape.shapeEffects.length; index++) {
      const matchingEffect = combatStore.selectedAbility.effects[index];
      const matchingShapeEffect = shape.shapeEffects[index];

      if (matchingEffect.effectType === EffectType.Damage) {
        for (const coordinate of matchingShapeEffect.coordinates) {
          const newCoordinates = {
            x: origin.coordinates.x + coordinate.x,
            y: origin.coordinates.y + coordinate.y,
          };

          const gridTile = combatStore.getTilebyCoordinates(newCoordinates);
          if (gridTile) {
            redTiles.push(gridTile);
          }
        }
      }
      if (matchingEffect.effectType === EffectType.Move) {
        console.log("MoveStuff");
        // It's all really same calculation with one above, so I feel like we should do helper function and run that bunch of times
        for (const coordinate of matchingShapeEffect.coordinates) {
          const newCoordinates = {
            x: origin.coordinates.x + coordinate.x,
            y: origin.coordinates.y + coordinate.y,
          };

          const gridTile = combatStore.getTilebyCoordinates(newCoordinates);
          if (gridTile) {
            whiteTiles.push(gridTile);
          }
        }
      }
    }
  }

  return {
    blueTiles,
    yellowTiles,
    redTiles,
    whiteTiles,
    greenTiles,
  };
});

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

// Event Listeners (Have to be in created, on mounted not working)
useEvent("Space", combatStore.endTurn);
useEvent("Escape", combatStore.cancelAbility);
useEvent("KeyR", combatStore.rotateShape);

onMounted(() => {
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
.white-tiles {
  background-color: rgba(255, 255, 255, 0.3);

  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
.blue-tiles {
  background-color: rgba(0, 0, 255, 0.3);

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 255, 0.4);
  }
}
.red-tiles {
  background-color: rgba(255, 0, 0, 0.3);

  cursor: pointer;
  &:hover {
    background-color: rgba(255, 0, 0, 0.4);
  }
}
.info-text {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: var(--elevation2);
  padding: 0.5rem;
}
.cast-ready {
  cursor: pointer;
}
</style>
