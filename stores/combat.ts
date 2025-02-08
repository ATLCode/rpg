import { usePlayerStore } from "@/stores/player";
import { GameState, useGameStore } from "@/stores/game";
import { useSkillStore } from "@/stores/skill";
import { useItemStore } from "@/stores/item";
import { useEncounterStore } from "@/stores/encounter";
// import { useLocationStore } from "@/stores/location";
import {
  CombatSide,
  type Combat,
  type CombatReturn,
  type CombatState,
  type CombatTile,
  type Unit,
} from "~/types/combat.types";
import { combatGrids } from "~/game/combat";
import { SkillId } from "~/types/skill.types";
import {
  AbilityCost,
  EffectType,
  type Ability,
  type AbilityShape,
  type Effect,
} from "~/types/ability.types";
import type { Coordinates } from "~/types/general.types";

export const useCombatStore = defineStore("combat", () => {
  const playerStore = usePlayerStore();
  const skillStore = useSkillStore();
  const gameStore = useGameStore();
  const itemStore = useItemStore();
  const encounterStore = useEncounterStore();
  // const locationStore = useLocationStore();

  const combatState = ref<CombatState | null>(null);
  const returnInfo = ref<CombatReturn | null>(null);

  function startCombat(combat: Combat) {
    // set new combat state
    combatState.value = {
      grid: combatGrids.Basic,
      entities: [],
      units: [],
      // What if turnOrder is only for units and entities are completely separate things?
      // Things like Poison Cloud or Magic Aura. Essentially things that we show, but belong to Units and they activate/happen with units turn.
      // Entities are their own things that can be created by spells?
      turnOrder: [], // Only units?
      currentTurnIndex: 0,
      currentRound: 0,
      rewards: {
        meleeExp: 0,
        rangedExp: 0,
        magicExp: 0,
        drops: [],
        selectedDrops: [],
      },
      result: {
        isOver: false,
        isWon: false,
      },
    };

    // Add units
    for (const unit of playerStore.playerGroup) {
      combatState.value.units.push(unit);
      combatState.value.turnOrder.push(unit);
    }
    for (const unit of combat.enemyGroup) {
      combatState.value.units.push(unit);
      combatState.value.turnOrder.push(unit);
    }
    console.log(combatState.value);
    // Change game state
    gameStore.gameState = GameState.Combat;
  }

  function returnFromCombat() {
    if (!combatState.value) {
      return;
    }
    // Get exps
    skillStore.giveSkillExp(SkillId.Melee, combatState.value.rewards.meleeExp);
    skillStore.giveSkillExp(
      SkillId.Ranged,
      combatState.value.rewards.rangedExp
    );
    skillStore.giveSkillExp(SkillId.Magic, combatState.value.rewards.magicExp);
    // Get drops
    for (const selectedDrop of combatState.value.rewards.selectedDrops) {
      itemStore.addItemsToInventory(selectedDrop.gameItem);
    }
    // Lose energy
    const energyLoss = 30;
    if (playerStore.energy < 30) {
      playerStore.energy = 0;
    } else {
      playerStore.energy -= energyLoss;
    }
    // Change Game State
    if (encounterStore.activeEncounter) {
      encounterStore.finishEncounter();
    } else {
      gameStore.gameState = GameState.Normal;
    }

    // Return from combat
    returnInfo.value = null;
  }

  // COMBAT DATA
  const selectedAbility = ref<Ability | null>(null);
  // Targeted
  const selectedTarget = ref<CombatTile | null>(null);
  // Shaped
  const selectedOrigin = ref<CombatTile | null>(null);
  const selectedShape = ref<AbilityShape | null>(null);

  // COMBAT HELPERS
  function startBattle() {
    nextRound();
    startTurn();
  }

  function selectAbility(ability: Ability) {
    if (selectedAbility.value?.id === ability.id) {
      selectedAbility.value = null;
    } else {
      selectedAbility.value = ability;

      if (
        selectedAbility.value.shape &&
        selectedAbility.value.shape.originRange === 0 &&
        currentTurnUnit.value &&
        currentTurnUnit.value.position &&
        combatState.value
      ) {
        selectedOrigin.value = getTilebyCoordinates(
          currentTurnUnit.value.position
        );
        selectedShape.value = selectedAbility.value.shape.shapes[0];
        // Should selectOrigin be it's own function where we do above 2 steps?
      }
    }
  }

  function cancelAbility() {
    selectedAbility.value = null;
    selectedOrigin.value = null;
    selectedShape.value = null;
  }

  function rotateShape() {
    console.log("rotating");
    if (!selectedAbility.value || !selectedAbility.value.shape) {
      return;
    }
    const currentIndex = selectedAbility.value.shape.shapes.findIndex(
      (shape) => shape === selectedShape.value
    );
    if (currentIndex === selectedAbility.value.shape.shapes.length - 1) {
      selectedShape.value = selectedAbility.value.shape.shapes[0];
    } else {
      selectedShape.value =
        selectedAbility.value.shape.shapes[currentIndex + 1];
    }
  }

  function handleEnemyTurn() {}

  function nextRound() {
    if (!combatState.value) {
      throw new Error("No combat state");
    }
    combatState.value.currentRound += 1;
    combatState.value.currentTurnIndex = 0;
  }
  function startTurn() {
    if (!currentTurnUnit.value) {
      throw new Error("Issue with turns");
    }
    currentTurnUnit.value.hasMainAction = true;
    currentTurnUnit.value.hasSideAction = true;
  }

  function endTurn() {
    if (!combatState.value) {
      throw new Error("No combat state");
    }
    if (
      combatState.value.currentTurnIndex >=
      combatState.value.turnOrder.length - 1
    ) {
      nextRound();
    } else {
      combatState.value.currentTurnIndex += 1;
      if (
        combatState.value.turnOrder[combatState.value.currentTurnIndex].side ===
        CombatSide.Enemy
      ) {
        handleEnemyTurn();
      }
    }
    startTurn();
  }

  function getTilebyCoordinates(coordinates: Coordinates) {
    console.log(coordinates);
    if (!combatState.value) {
      return null;
    }
    const grid = Object.values(combatState.value.grid);
    const tileAtCoordinates = grid.find((tile) => {
      if (
        tile.coordinates.x === coordinates.x &&
        tile.coordinates.y === coordinates.y
      ) {
        return tile;
      } else {
        return null;
      }
    });
    console.log(tileAtCoordinates);
    if (tileAtCoordinates) {
      return tileAtCoordinates;
    } else {
      return null;
    }
  }

  const currentTurnUnit = computed(() => {
    if (combatState.value) {
      return combatState.value.turnOrder[combatState.value.currentTurnIndex];
    } else {
      return null;
    }
  });

  // In use ability maybe we get user from that computed, assuming useAbility can only happen on that players turn who currently has it.

  function useTargetedAbility(
    ability: Ability,
    user: Unit,
    target: Coordinates
  ) {
    console.log("Using targeted ability");
    const effects = ability.effects;
    for (const effect of effects) {
      useEffect(effect, user, target);
    }
    payAbilityCost(user, ability);
    if (user.isPlayer) {
      saveXpToCombatRewards(ability);
    }
    if (!user.hasMainAction && !user.hasSideAction) {
      endTurn();
    }
  }
  function useShapedAbility(ability: Ability, user: Unit, origin: Coordinates) {
    console.log("Using shaped ability");
  }

  function useEffect(effect: Effect, user: Unit, target: Coordinates) {
    const targetUnit = findTargetInTile(target);
    if (effect.effectType === EffectType.Move) {
      if (!targetUnit) {
        user.position = target;
      }
    }
    if (effect.effectType === EffectType.Damage) {
      if (targetUnit) {
        damageUnit(effect, targetUnit);
      }
    }
    if (effect.effectType === EffectType.Heal) {
      if (targetUnit) {
        healUnit(effect, targetUnit);
      }
    }
  }

  function findTargetInTile(coordinates: Coordinates) {
    const targetUnit = combatState.value!.units.find((unit) => {
      // No idea why I have to check x and y separately for it to return true
      if (
        unit.position &&
        unit.position.x === coordinates.x &&
        unit.position.y === coordinates.y
      ) {
        return unit;
      }
      return null;
    });
    if (targetUnit) {
      return targetUnit;
    } else {
      return null;
    }
  }

  function hasAbilityCost(ability: Ability) {
    if (ability.cost === AbilityCost.MainAction) {
      if (currentTurnUnit.value!.hasMainAction) {
        return true;
      } else {
        return false;
      }
    }
    if (ability.cost === AbilityCost.SideAction) {
      if (currentTurnUnit.value!.hasSideAction) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  function payAbilityCost(user: Unit, ability: Ability) {
    if (ability.cost === AbilityCost.MainAction) {
      user.hasMainAction = false;
    }
    if (ability.cost === AbilityCost.SideAction) {
      user.hasSideAction = false;
    }
  }

  function saveXpToCombatRewards(ability: Ability) {
    if (ability.skillId === SkillId.Melee) {
      combatState.value!.rewards.meleeExp += ability.xp;
    }
    if (ability.skillId === SkillId.Ranged) {
      combatState.value!.rewards.rangedExp += ability.xp;
    }
    if (ability.skillId === SkillId.Magic) {
      combatState.value!.rewards.magicExp += ability.xp;
    }
  }

  function damageUnit(effect: Effect, unit: Unit) {
    if (!(effect.effectType === EffectType.Damage) || !effect.value) {
      return;
    }
    unit.currentHealth -= effect.value;
  }

  function healUnit(effect: Effect, unit: Unit) {
    console.log("healing");
    console.log(unit);
    if (!(effect.effectType === EffectType.Heal) || !effect.value) {
      return;
    }
    unit.currentHealth += effect.value;
  }

  function isInRange(
    coordinates1: Coordinates,
    coordinates2: Coordinates,
    range: number
  ) {
    const xDifference = Math.abs(coordinates1.x - coordinates2.x);
    const yDifference = Math.abs(coordinates1.y - coordinates2.y);
    if (xDifference <= range && yDifference <= range) {
      return true;
    } else {
      return false;
    }
  }

  return {
    combatState,
    startCombat,
    returnFromCombat,
    startBattle,
    selectedAbility,
    selectedTarget,
    selectedOrigin,
    selectedShape,
    selectAbility,
    cancelAbility,
    rotateShape,
    endTurn,
    useTargetedAbility,
    useShapedAbility,
    findTargetInTile,
    hasAbilityCost,
    useEffect,
    currentTurnUnit,
    isInRange,
    getTilebyCoordinates,
  };
});
