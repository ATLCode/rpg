import {
  usePlayerStore,
  GameState,
  type Unit,
  type InventoryItem,
} from "@/stores/player";
import { SkillId } from "~/game/abilities";
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
  const skillStore = useSkillStore();

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
    if (!combatState.value) {
      return;
    }
    // Get exp
    skillStore.giveSkillExp(SkillId.Melee, combatState.value.rewards.meleeExp);
    skillStore.giveSkillExp(
      SkillId.Ranged,
      combatState.value.rewards.rangedExp
    );
    skillStore.giveSkillExp(SkillId.Magic, combatState.value.rewards.magicExp);
    // Get drops
    // Change Game State
    playerStore.gameState = GameState.Normal;
    // Return from combat
    returnInfo.value = null;
  }

  return { combatState, startCombat, returnFromCombat };
});
