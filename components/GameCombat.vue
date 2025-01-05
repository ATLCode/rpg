<template>
  <div v-if="combatStore.combatState" class="combat-container">
    <div id="combat-grid" class="combat-grid">
      <CombatUnit
        v-if="!(combatStage === CombatStage.Setup)"
        v-for="unit in combatStore.combatState.entities"
        :unit="unit"
        :style="unitStyle(unit)"
        @click="selectUnitForInfo(unit)"
      />
      <div
        v-for="(tile, index) in combatStore.combatState.grid"
        :key="index"
        :id="index == '0;0' ? 'combat-tile' : undefined"
        class="combat-tile"
      >
        {{ tile.test }}
      </div>
    </div>
    <CombatBattlefieldInfo class="info-battlefield" />
    <CombatAbilities
      class="info-abilities"
      :unit="selectedPlayer"
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
import { ulid } from "ulid";
import { abilities } from "~/game/abilities";
import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useCombatStore } from "@/stores/combat";
import { useGameStore } from "@/stores/game";
import { useEvent } from "@/composables/keyEvent";
import { chooseRandomWeightedObject } from "~/utils/weight-calculation";
import { EffectType, type Ability } from "~/types/ability.types";
import { CombatSide, CombatStage, type Unit } from "~/types/combat.types";
import { SkillId } from "~/types/skill.types";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();
const combatStore = useCombatStore();
const gameStore = useGameStore();

const selectedAbility = ref<Ability | null>();

const showSelectedEnemy = ref(false);
const selectedEnemy = ref<Unit | null>(null);
const showSelectedPlayer = ref(false);
const selectedPlayer = ref<Unit | null>(null);

const combatStage = ref<CombatStage>(CombatStage.Setup);
const turnOrder = ref([]);

// TODO Handle turns
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

  setTimeout(() => {
    const x = document.getElementById("combat-tile")?.clientHeight;
  }, 500);
}

function unitStyle(unit: Unit) {
  if (!unit.position) {
    console.log(unit);
    throw new Error("Unit is missing position");
  }
  //TODO Handle 128 (sprite height/width) being different
  const heightOffset = (tileHeight.value - 128) / 2;
  const widthOffset = (tileWidth.value - 128) / 2;
  return {
    position: "absolute",
    top: `${tileHeight.value * unit.position.x + heightOffset}px`,
    left: `${tileWidth.value * unit.position.y + widthOffset}px`,
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

function selectAbility(ability: Ability) {
  console.log(ability);
}
function useAbility() {}

/*
function useAbility(ability: Ability, user: Unit, target: Unit) {
  if (!ability?.combatDetails || !combatStore.combatState) {
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
}
  */
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
    const player = combatStore.combatState.entities.find(
      (unit) => unit.isPlayer
    );
    player!.position = { x: 3, y: 0 };
    const enemy = combatStore.combatState.entities.find(
      (unit) => unit.side === CombatSide.Enemy
    );
    enemy!.position = { x: 3, y: 10 };
    combatStage.value = CombatStage.Ongoing;
  }
  calculateGridSize();
  // Handle window resize
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
</style>
