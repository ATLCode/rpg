import { GameState } from "#imports";
import {
  type Encounter,
  type EncounterId,
  encounters,
} from "~/game/encounters";
import { useGameStore } from "@/stores/game";

export type EncounterReturnState = {
  gameState: GameState;
  progress: number;
};

export const useEncounterStore = defineStore("encounter", () => {
  const activeEncounter = ref<Encounter | null>(null);
  const encounterReturnState = ref<EncounterReturnState | null>(null);

  const gameStore = useGameStore();

  function startEncounter(
    encounterId: EncounterId,
    returnState: EncounterReturnState
  ) {
    activeEncounter.value = encounters[encounterId];
    encounterReturnState.value = returnState;
  }
  function finishEncounter() {
    if (!encounterReturnState.value) {
      throw new Error("Something went wrong with encounter");
    }
    gameStore.gameState = encounterReturnState.value.gameState;
  }

  function $reset() {
    activeEncounter.value = null;
    encounterReturnState.value = null;
  }

  return {
    $reset,
    activeEncounter,
    startEncounter,
    finishEncounter,
    encounterReturnState,
  };
});
