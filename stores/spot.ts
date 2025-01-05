import { type WeightedActionId } from "~/types/spot.types";

import { abilities } from "~/game/abilities";
import { actions } from "~/game/actions";

export const useSpotStore = defineStore("spot", () => {
  function selectRandomAbility(availableActionIds: WeightedActionId[]) {
    // TODO Handling if available abilities is empty
    return actions[chooseRandomWeightedObject(availableActionIds)];
  }

  function $reset() {}
  return {
    selectRandomAbility,
    $reset,
  };
});
