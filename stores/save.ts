import { usePlayerStore } from "./player";
import { useLocationStore } from "@/stores/location";

export const useSaveStore = defineStore("save", () => {
  const playerStore = usePlayerStore();
  const locationStore = useLocationStore();
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
    currentLocationId: number;
    characterName: string;
  };

  type Save = {
    id: number | undefined;
    data: SaveData;
  };

  const saves = ref<Save[]>([]);

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
      currentLocationId: locationStore.currentLocation.id,
      characterName: playerStore.characterName,
    };

    // return Buffer.from(JSON.stringify(save)).toString("base64");
    return window.btoa(unescape(encodeURIComponent(JSON.stringify(save))));
  }

  function deconstructSaveData(data: string): SaveData {
    // const saveData = JSON.parse(Buffer.from(data, "base64").toString("ascii"));
    const saveData = JSON.parse(decodeURIComponent(escape(window.atob(data))));
    if (
      !saveData.currentLocationId ||
      typeof saveData.currentLocationId !== "number"
    ) {
      console.log("Houston we have a problem");
    }
    return saveData;
  }

  async function updateSave(saveId: number) {
    try {
      await $fetch("/api/saves/update", {
        method: "POST",
        body: {
          saveId,
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
    locationStore.currentLocation.id = saveSlot.data.currentLocationId;
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

  return { saves, updateSave, createSave, loadSave, deleteSave, getUserSaves };
});
