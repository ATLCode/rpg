<template>
  <div v-if="combatStore.combatState" class="combat-container">
    <div class="combat-grid">
      <div
        v-for="(tile, index) in combatStore.combatState.grid"
        :key="index"
        class="combat-tile"
      >
        <CombatUnit
          v-if="tile.unit"
          :unit="tile.unit"
          @click="selectUnitForInfo(tile.unit)"
        />
      </div>
    </div>
    <CombatBattlefieldInfo class="info-battlefield" />
    <CombatAbilities class="info-abilities" :unit="selectedPlayer" />
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
import { EffectType, SkillId, type Ability } from "~/types/ability.types";
import type { Unit } from "~/types/combat.types";

const playerStore = usePlayerStore();
const skillStore = useSkillStore();
const combatStore = useCombatStore();
const gameStore = useGameStore();

const selectedAbility = ref<Ability | null>();

const showSelectedEnemy = ref(false);
const selectedEnemy = ref<Unit | null>(null);
const showSelectedPlayer = ref(false);
const selectedPlayer = ref<Unit | null>(null);

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

function selectUnitForInfo(unit: Unit) {
  if (unit.isPlayer) {
    selectedPlayer.value = unit;
    showSelectedPlayer.value = true;
  } else {
    selectedEnemy.value = unit;
    showSelectedEnemy.value = true;
  }
}

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
  // Place Units
  if (combatStore.combatState) {
    combatStore.combatState.grid["3;0"].unit =
      combatStore.combatState.playerGroup[0];
    combatStore.combatState.grid["3;10"].unit =
      combatStore.combatState.enemyGroup[0];
  }
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
