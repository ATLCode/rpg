import { defaults } from "~/game/defaults";
import { usePlayerStore } from "@/stores/player";

export const useWorldStore = defineStore("world", () => {
  const playerStore = usePlayerStore();

  const day = ref(defaults.startingDay);

  const viewLocations = ref([]);
  const viewPaths = ref([]);

  function sleep(energyRestore: number) {
    playerStore.energy = energyRestore;
    day.value += 1;
    // Restock shops
    // Heal Player based on food used and stuff
    // Give buffs based on food?
  }

  return { day, viewLocations, viewPaths, sleep };
});
