import { usePlayerStore, type Unit } from "@/stores/player";
import type { Encounter } from "~/game/encounters";
import type { GameItem } from "~/types/item.types";
import { useGameStore } from "@/stores/game";
import { SkillId } from "~/types/ability.types";

export type Drop = {
  id: string;
  gameItem: GameItem;
};

export type CombatState = {
  playerGroup: Unit[];
  enemyGroup: Unit[];
  playerGroupTurn: boolean;
  currentTurn: {
    unitIndex: number;
  };
  rewards: {
    meleeExp: number;
    rangedExp: number;
    magicExp: number;
    drops: Drop[];
    selectedDrops: Drop[];
  };
  result: {
    isOver: boolean;
    isWon: boolean;
  };
};

export const useCombatStore = defineStore("combat", () => {
  const playerStore = usePlayerStore();
  const skillStore = useSkillStore();
  const gameStore = useGameStore();

  const combatState = ref<CombatState | null>();

  const returnInfo = ref(null);

  function startCombat(encounter: Encounter) {
    // set new combat state
    combatState.value = {
      playerGroup: useDeepCloneArray(playerStore.playerGroup), // can't clone refs?
      enemyGroup: useDeepCloneArray(encounter.enemyGroup),
      playerGroupTurn: true,
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
      playerStore.addItemsToInventory(selectedDrop.gameItem);
    }
    // Lose energy
    const energyLoss = 30;
    if (playerStore.energy < 30) {
      playerStore.energy = 0;
    } else {
      playerStore.energy -= energyLoss;
    }
    // Change Game State
    gameStore.gameState = GameState.Normal;
    // Return from combat
    returnInfo.value = null;
  }

  return { combatState, startCombat, returnFromCombat };
});
