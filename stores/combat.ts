import { usePlayerStore } from "@/stores/player";
import { GameState, useGameStore } from "@/stores/game";
import { useSkillStore } from "@/stores/skill";
import { useItemStore } from "@/stores/item";
import { useEncounterStore } from "@/stores/encounter";
// import { useLocationStore } from "@/stores/location";
import type { Combat, CombatReturn, CombatState } from "~/types/combat.types";
import { combatGrids } from "~/game/combat";
import { SkillId } from "~/types/skill.types";

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
      currentTurn: {
        unitIndex: 0,
      },
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

    // Add entities
    for (const unit of playerStore.playerGroup) {
      combatState.value.entities.push(unit);
      // Create entity for each unit
    }
    for (const unit of combat.enemyGroup) {
      combatState.value.entities.push(unit);
    }
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

  return { combatState, startCombat, returnFromCombat };
});
