import { usePlayerStore, type Gear, type InventoryItem } from "./player";
import type { LocationId } from "~/game/locations";

import { useLocationStore } from "@/stores/location";

export const useSaveStore = defineStore("save", () => {
  const playerStore = usePlayerStore();
  const locationStore = useLocationStore();

  const client = useSupabaseClient();

  async function logIn() {
    // Move stuff here from index after figuring how to do errors
  }

  async function logOut() {
    await updateSave();
    const { error } = await client.auth.signOut();

    if (error) {
      console.log(error.message);
    }
  }

  /* 
    Save includes:
    -Player
    -World
  */

  /* 
  Verkku: How do we show for example 5 save slots. If you have 3 saves, we should show those and 2 empty ones?
   Do we fill saves array in store with slots that are ampty or what?
  */

  type SaveData = {
    currentLocationId: LocationId;
    characterName: string;
    gear: Gear;
    inventory: (InventoryItem | null)[];
  };

  type Save = {
    id: number | undefined;
    data: SaveData;
  };

  const saves = ref<Save[]>([]);
  const selectedSaveId = ref<number | undefined>(undefined);

  async function getUserSaves() {
    const { data, error } = await useFetch("/api/saves/get-for-user");
    if (error.value || !data.value) {
      throw new Error(`Unable to load the saves: ${error.value}`);
    }
    saves.value = data.value.map((save) => {
      const { id, saveData } = save;
      return {
        id: id as number,
        data: deconstructSaveData(saveData),
      };
    });
  }

  function constructSaveData() {
    const save: SaveData = {
      currentLocationId: locationStore.currentLocationId,
      characterName: playerStore.characterName,
      gear: playerStore.gear,
      inventory: playerStore.inventory,
    };

    // return Buffer.from(JSON.stringify(save)).toString("base64");
    return window.btoa(unescape(encodeURIComponent(JSON.stringify(save))));
  }

  function deconstructSaveData(data: string): SaveData {
    // const saveData = JSON.parse(Buffer.from(data, "base64").toString("ascii"));
    const saveData = JSON.parse(decodeURIComponent(escape(window.atob(data))));
    if (!saveData.currentLocationId) {
      console.log("Houston we have a problem");
    }
    return saveData;
  }

  async function updateSave() {
    console.log(selectedSaveId);

    try {
      await $fetch("/api/saves/update", {
        method: "POST",
        body: {
          saveId: selectedSaveId,
          saveData: constructSaveData(),
        },
      });
      getUserSaves();
    } catch (error) {
      // console.error(error);
    }
  }

  async function createSave() {
    try {
      console.log("Creating Save");
      const saveData = constructSaveData();
      console.log(saveData);
      await $fetch("/api/saves/add", {
        method: "POST",
        body: {
          saveData: constructSaveData(),
        },
      });
      getUserSaves();
    } catch (error) {
      console.error(error);
    }
  }

  function loadSave(saveSlot: Save) {
    console.log(saveSlot.data);
    playerStore.characterName = saveSlot.data.characterName;
    locationStore.currentLocationId = saveSlot.data.currentLocationId;
    playerStore.gear = saveSlot.data.gear;
    playerStore.inventory = saveSlot.data.inventory;
    selectedSaveId.value = saveSlot.id;
    navigateTo("/game");
  }

  async function deleteSave(saveId: number) {
    try {
      await $fetch("/api/saves/delete", {
        method: "POST",
        body: {
          saveId,
        },
      });
      getUserSaves();
    } catch (error) {
      // console.error(error);
    }
  }

  return {
    saves,
    logIn,
    logOut,
    updateSave,
    createSave,
    selectedSaveId,
    loadSave,
    deleteSave,
    getUserSaves,
  };
});
