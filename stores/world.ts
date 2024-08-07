import { defaults } from "~/game/defaults";
import { usePlayerStore } from "@/stores/player";
import { useNpcStore } from "@/stores/npc";

export const useWorldStore = defineStore("world", () => {
  const playerStore = usePlayerStore();
  const npcStore = useNpcStore();

  const day = ref(defaults.startingDay);

  const viewLocations = ref([]);
  const viewPaths = ref([]);

  function sleep(energyRestore: number) {
    playerStore.energy = energyRestore;

    restockShops();
    // Heal Player based on food used and stuff
    // Give buffs based on food?
    day.value += 1;
  }

  function restockShops() {
    console.log("Restocking");
    const lastDigit = day.value % 10;
    const shopNpcs = npcStore.npcs.filter((npc) => npc.shop);
    console.log(lastDigit);
    console.log(shopNpcs);
    if (lastDigit === 0) {
      console.log("No new deliveries to shops");
      return;
    }
    shopNpcs.forEach((npc) => {
      console.log(npc.name);
      npc.shop!.stock.forEach((stockItem) => {
        console.log(stockItem);
        if (!stockItem.shopMaxStackSize) {
          throw new Error("Shop item doesn't have max stack size");
        }
        stockItem.currentStackSize = stockItem.shopMaxStackSize;
      });
    });
  }

  function $reset() {
    day.value = defaults.startingDay;
  }

  return { day, viewLocations, viewPaths, sleep, $reset };
});
