import { defaults } from "~/game/defaults";
import { usePlayerStore } from "@/stores/player";
import { useNpcStore } from "@/stores/npc";
import type { Time } from "~/types/world.types";

export const useWorldStore = defineStore("world", () => {
  const playerStore = usePlayerStore();
  const npcStore = useNpcStore();

  const time = ref<Time>(defaults.startingTime);

  /*
  TIME

  Same as seconds-minutes-hours-days
  We do days-weeks-seasons-years

  Maybe have a running dayCount as well?

  Starting time object something like:
  {
  day: 1
  week: 1
  seasons: 1
  year: 1
  }

  const dayCap = 7
  const weekCap = 4
  const seasonCap = 4
  
  Years has no cap

  */

  const viewLocations = ref([]);
  const viewPaths = ref([]);

  function sleep(energyRestore: number) {
    playerStore.energy = energyRestore;

    restockShops();
    // Heal Player based on food used and stuff
    // Give buffs based on food?
    addDayToTime();
    // Run event etc. checker function
  }

  function addDayToTime() {
    const dayCap = 7;
    const weekCap = 4;
    const seasonCap = 4;

    if (time.value.day < dayCap) {
      time.value.day += 1;
    } else if (time.value.week < weekCap) {
      time.value.week += 1;
      time.value.day = 1;
    } else if (time.value.season < seasonCap) {
      time.value.season += 1;
      time.value.week = 1;
      time.value.day = 1;
    } else {
      time.value.year += 1;
      time.value.season = 1;
      time.value.week = 1;
      time.value.day = 1;
    }
    time.value.dayCount += 1;
  }

  function restockShops() {
    console.log("Restocking");
    const lastDigit = time.value.dayCount % 10;
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
    time.value = defaults.startingTime;
  }
  return { time, viewLocations, viewPaths, sleep, $reset };
});
