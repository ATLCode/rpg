import type { ActionId } from "~/game/actions";
import { defaults } from "~/game/defaults";
import type { Action } from "~/types/action.types";

export const useActionStore = defineStore("action", () => {
  const playerActions = ref<Action[]>(defaults.startingActions);

  const playerActionIds = computed(() => {
    const ids: ActionId[] = [];
    for (const item of playerActions.value) {
      ids.push(item.id);
    }
    return ids;
  });
  function $reset() {
    playerActions.value = defaults.startingActions;
  }
  return {
    playerActions,
    playerActionIds,
    $reset,
  };
});
