import { usePlayerStore, type Gear } from "./player";
import type { Skill } from "./skill";
import { useSkillStore } from "./skill";
import { useNpcStore } from "./npc";
import { useWorldStore } from "@/stores/world";
import { useNotificationStore } from "@/stores/notification";
import type { LocationId } from "~/game/locations";
import { useLocationStore } from "@/stores/location";
import type { Ability, SkillId } from "~/game/abilities";
import type { Npc } from "~/game/npcs";
import type { GameItem } from "~/types/item.types";

export const useSaveStore = defineStore("save", () => {
  const playerStore = usePlayerStore();
  const locationStore = useLocationStore();
  const skillStore = useSkillStore();
  const npcStore = useNpcStore();
  const worldStore = useWorldStore();
  const notificationStore = useNotificationStore();

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
    day: number;
    energy: number;
    currentLocationId: LocationId;
    characterName: string;
    gear: Gear;
    inventory: (GameItem | null)[];
    skills: Record<SkillId, Skill>;
    abilities: Ability[];
    npcs: Npc[];
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
    saves.value = data.value
      .sort((a, b) => {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      })
      .map((save) => {
        const { id, saveData } = save;
        return {
          id: id as number,
          data: deconstructSaveData(saveData),
        };
      });
  }

  function constructSaveData() {
    const save: SaveData = {
      day: worldStore.day,
      energy: playerStore.energy,
      currentLocationId: locationStore.currentLocationId,
      characterName: playerStore.characterName,
      gear: playerStore.gear,
      inventory: playerStore.inventory,
      skills: skillStore.skills,
      abilities: skillStore.abilities,
      npcs: npcStore.npcs,
    };

    // return Buffer.from(JSON.stringify(save)).toString("base64");
    return window.btoa(encodeURIComponent(JSON.stringify(save)));
  }

  function deconstructSaveData(data: string): SaveData {
    // const saveData = JSON.parse(Buffer.from(data, "base64").toString("ascii"));
    const saveData = JSON.parse(decodeURIComponent(window.atob(data)));
    if (!saveData.currentLocationId) {
      console.log("Houston we have a problem");
    }
    return saveData;
  }

  async function updateSave() {
    console.log(skillStore.skills);
    try {
      await $fetch("/api/saves/update", {
        method: "POST",
        body: {
          saveId: selectedSaveId.value,
          saveData: constructSaveData(),
        },
      });
      getUserSaves();
      notificationStore.showNotification(
        NotificationType.Game,
        "Save Successful",
        false,
        1000
      );
    } catch (error) {
      // console.error(error);
    }
  }

  async function createSave() {
    // How can we initially find out save slot of the save after creating it

    try {
      console.log("Creating Save");
      clearSaveData();
      const saveData = constructSaveData();
      console.log(saveData);

      await $fetch("/api/saves/add", {
        method: "POST",
        body: {
          saveData: constructSaveData(),
        },
      });
      await getUserSaves();

      // Momentary solution
      selectedSaveId.value = saves.value.reduce((prev, current) =>
        prev && prev.id! > current.id! ? prev : current
      ).id;
    } catch (error) {
      console.error(error);
    }
  }

  function loadSave(saveSlot: Save) {
    console.log(saveSlot);
    console.log(saveSlot.data);
    prepareSaveData(saveSlot);
    navigateTo("/game");
  }

  function loadLatestSave() {
    if (saves.value.length) {
      const save = saves.value[0];
      prepareSaveData(save);
    }
  }

  function prepareSaveData(save: Save) {
    selectedSaveId.value = save.id;
    playerStore.energy = save.data.energy;
    playerStore.characterName = save.data.characterName;
    playerStore.gear = save.data.gear;
    playerStore.inventory = save.data.inventory;
    worldStore.day = save.data.day;
    locationStore.currentLocationId = save.data.currentLocationId;
    skillStore.skills = save.data.skills;
    skillStore.abilities = save.data.abilities;
    npcStore.npcs = save.data.npcs;
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

  function clearSaveData() {
    playerStore.$reset();
    worldStore.$reset();
    locationStore.$reset();
    skillStore.$reset();
    npcStore.$reset();
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
    loadLatestSave,
  };
});
