import { defaults } from "~/game/defaults";
import { usePlayerStore } from "@/stores/player";
import { useNpcStore } from "@/stores/npc";
import type { Time } from "~/types/world.types";

export const useWorldStore = defineStore("world", () => {
  const playerStore = usePlayerStore();
  const npcStore = useNpcStore();

  const time = ref<Time>(defaults.startingTime);

  const viewLocations = ref([]);
  const viewPaths = ref([]);

  function sleep(energyRestore: number) {
    playerStore.energy = energyRestore;

    // restockShops();
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
    time.value.hours = 8;
    time.value.minutes = 0;
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

  function showTime() {
    let hoursOutput = time.value.hours.toString();
    let minutesOutput = time.value.minutes.toString();
    if (time.value.hours < 10) {
      hoursOutput = "0" + time.value.hours;
    }
    if (time.value.minutes < 10) {
      minutesOutput = "0" + time.value.minutes;
    }

    return `${hoursOutput}:${minutesOutput}`;
  }

  function addTime(minutes: number) {
    /*
    const hourInMin = 60;
    const dayInMin = 1440;
    const weekInMin = 10080;
    const seasonInMin = weekInMin * 4;

    const s = Math.floor(minutes / seasonInMin);
    const w = Math.floor((minutes % seasonInMin) / weekInMin);
    const d = Math.floor(((minutes % seasonInMin) % weekInMin) / dayInMin);
    const h = Math.floor(
      (((minutes % seasonInMin) % weekInMin) % dayInMin) / hourInMin
    );
    const m = Math.floor(
      (((minutes % seasonInMin) % weekInMin) % dayInMin) % hourInMin
    );

    console.log("Minutes" + m);
    console.log("Hours" + h);
    console.log("Days" + d);
    console.log("Weeks" + w);
    console.log("Seasons" + s);
    */

    const minCap = 60;
    const hourCap = 24;
    const dayCap = 8;
    const weekCap = 5;
    const seasonCap = 5;

    let leftoverMinutes = minutes + time.value.minutes;
    while (leftoverMinutes >= minCap) {
      leftoverMinutes -= minCap;
      time.value.hours += 1;
    }
    time.value.minutes = leftoverMinutes;
    while (time.value.hours >= hourCap) {
      time.value.hours -= hourCap;
      time.value.day += 1;
    }
    while (time.value.day >= dayCap) {
      time.value.day -= dayCap - 1;
      time.value.week += 1;
    }
    while (time.value.week >= weekCap) {
      time.value.week -= weekCap - 1;
      time.value.season += 1;
    }
    while (time.value.season >= seasonCap) {
      time.value.season -= seasonCap - 1;
      time.value.year += 1;
    }
  }

  function $reset() {
    time.value = defaults.startingTime;
  }
  return { time, viewLocations, viewPaths, sleep, showTime, addTime, $reset };
});
