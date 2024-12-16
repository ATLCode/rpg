import { type WeightedAbilityId } from "~/types/spot.types";

import { abilities } from "~/game/abilities";

export const useSpotStore = defineStore("spot", () => {
  function selectRandomAbility(availableAbilityIds: WeightedAbilityId[]) {
    // TODO Handling if available abilities is empty
    return abilities[chooseRandomWeightedObject(availableAbilityIds)];
  }

  function $reset() {}
  return {
    selectRandomAbility,
    $reset,
  };
});
