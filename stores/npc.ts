import { defaults } from "~/game/defaults";
import type { Npc } from "~/game/npcs";

export const useNpcStore = defineStore("npc", () => {
  const npcs = ref<Npc[]>(defaults.startingNpcs);

  return { npcs };
});
