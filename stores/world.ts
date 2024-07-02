import { defaults } from "~/game/defaults";

export const useWorldStore = defineStore("world", () => {
  const day = ref(defaults.startingDay);

  const viewLocations = ref([]);
  const viewPaths = ref([]);

  return { day, viewLocations, viewPaths };
});
