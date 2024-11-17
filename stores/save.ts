import type { Skill } from "./skill";
import { useSkillStore } from "./skill";
import { useNpcStore } from "./npc";
import { usePlayerStore } from "./player";
import { useWorldStore } from "@/stores/world";
import { useNotificationStore } from "@/stores/notification";
import { useItemStore } from "@/stores/item";
import { useLocationStore } from "@/stores/location";
import type { Npc } from "~/game/npcs";
import type { Gear, ItemContainer } from "~/types/item.types";
import type { Time } from "~/types/world.types";
import type { Ability, SkillId } from "~/types/ability.types";
import type { PlayerLocation } from "~/types/location.types";

export const useSaveStore = defineStore("save", () => {
  const playerStore = usePlayerStore();
  const locationStore = useLocationStore();
  const skillStore = useSkillStore();
  const npcStore = useNpcStore();
  const worldStore = useWorldStore();
  const notificationStore = useNotificationStore();
  const itemStore = useItemStore();

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
    time: Time;
    energy: number;
    playerLocation: PlayerLocation;
    characterName: string;
    gear: Gear;
    playerItemContainers: ItemContainer[];
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
      time: worldStore.time,
      energy: playerStore.energy,
      playerLocation: locationStore.playerLocation,
      characterName: playerStore.characterName,
      gear: itemStore.gear,
      playerItemContainers: itemStore.playerItemContainers,
      skills: skillStore.skills,
      abilities: skillStore.playerAbilities,
      npcs: npcStore.npcs,
    };

    // return Buffer.from(JSON.stringify(save)).toString("base64");
    return window.btoa(encodeURIComponent(JSON.stringify(save)));
  }

  function deconstructSaveData(data: string): SaveData {
    // const saveData = JSON.parse(Buffer.from(data, "base64").toString("ascii"));
    const saveData = JSON.parse(decodeURIComponent(window.atob(data)));
    if (!saveData.playerLocation) {
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
    itemStore.gear = save.data.gear;
    itemStore.playerItemContainers = save.data.playerItemContainers;
    worldStore.time = save.data.time;
    locationStore.playerLocation = save.data.playerLocation;
    skillStore.skills = save.data.skills;
    skillStore.playerAbilities = save.data.abilities;
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
