import {
  usePlayerStore,
  GameState,
  type Unit,
  type InventoryItem,
} from "@/stores/player";
import type { Encounter } from "~/game/encounters";

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
    drops: InventoryItem[];
  };
  result: {
    isOver: boolean;
    isWon: boolean;
  };
};

export const useCombatStore = defineStore("combat", () => {
  const playerStore = usePlayerStore();

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
      },
      result: {
        isOver: false,
        isWon: false,
      },
    };

    // change game state
    playerStore.gameState = GameState.Combat;
  }

  function returnFromCombat() {
    // Return from combat
    returnInfo.value = null;
  }

  return { combatState, startCombat, returnFromCombat };
});
