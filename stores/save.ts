import type { Skill } from "./skill";
import { useSkillStore } from "./skill";
import { useNpcStore } from "./npc";
import { usePlayerStore } from "./player";
import { useWorldStore } from "@/stores/world";
import { useNotificationStore } from "@/stores/notification";
import { useItemStore } from "@/stores/item";
import { useLocationStore } from "@/stores/location";
import { useActionStore } from "@/stores/action";
import type { Npc } from "~/game/npcs";
import type { ItemContainer } from "~/types/item.types";
import type { Time } from "~/types/world.types";
import type { Location } from "~/types/location.types";
import type { Ability, Unit } from "~/types/combat.types";
import type { Action } from "~/types/action.types";
import type { SkillId } from "~/types/skill.types";

export const useSaveStore = defineStore("save", () => {
  const playerStore = usePlayerStore();
  const locationStore = useLocationStore();
  const skillStore = useSkillStore();
  const npcStore = useNpcStore();
  const worldStore = useWorldStore();
  const notificationStore = useNotificationStore();
  const itemStore = useItemStore();
  const actionStore = useActionStore();

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
    // World Store
    time: Time;
    // Player Store
    playerUnit: Unit;
    playerLocation: Location;
    characterName: string;
    playerGroup: Unit[];
    // Item Store
    playerItemContainers: ItemContainer[];
    // Skill Store
    skills: Record<SkillId, Skill>;
    playerActions: Action[];
    playerAbilities: Ability[];
    //
    npcs: Npc[];
  };

  type Save = {
    id: number | undefined;
    data: SaveData;
  };

  const saves = ref<Save[]>([]);
  const selectedSaveId = ref<number | undefined>(undefined);

  async function getUserSaves() {
    try {
      const data = await $fetch("/api/saves/get-for-user");
      saves.value = data
        .sort((a: any, b: any) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        })
        .map((save) => {
          const { id, saveData } = save;
          return {
            id: id as number,
            data: decodeSaveData(saveData),
          };
        });
    } catch (error) {
      throw new Error(`Unable to load the saves: ${error}`);
    }
  }

  function encodeSaveData() {
    const save: SaveData = {
      time: worldStore.time,
      playerLocation: locationStore.playerLocation,
      characterName: playerStore.characterName,
      playerGroup: playerStore.playerGroup,
      playerItemContainers: itemStore.playerItemContainers,
      skills: skillStore.skills,
      playerActions: actionStore.playerActions,
      playerAbilities: playerStore.playerAbilities,
      npcs: npcStore.npcs,
      playerUnit: playerStore.playerUnit,
    };

    // return Buffer.from(JSON.stringify(save)).toString("base64");
    return window.btoa(encodeURIComponent(JSON.stringify(save)));
  }

  function decodeSaveData(data: string): SaveData {
    // const saveData = JSON.parse(Buffer.from(data, "base64").toString("ascii"));
    const saveData = JSON.parse(decodeURIComponent(window.atob(data)));
    if (!saveData.playerLocation) {
      throw new Error("Houston we have a problem");
    }
    return saveData;
  }

  async function updateSave() {
    try {
      await $fetch("/api/saves/update", {
        method: "POST",
        body: {
          saveId: selectedSaveId.value,
          saveData: encodeSaveData(),
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
      console.error(error);
    }
  }

  async function createSave() {
    try {
      clearSaveData();

      await $fetch("/api/saves/add", {
        method: "POST",
        body: {
          saveData: encodeSaveData(),
        },
      });
      await getUserSaves();

      // Momentary solution
      selectedSaveId.value = saves.value.reduce((prev, current) =>
        prev && prev.id! > current.id! ? prev : current
      ).id;
    } catch (error: any) {
      // TODO show notification to the player
      throw new Error(error);
    }
  }

  function loadSave(save: Save) {
    const playerUnit = save.data.playerGroup.find((e) => e.isPlayer);
    if (!playerUnit) {
      throw new Error("Can't find player unit from player group");
    }

    selectedSaveId.value = save.id;
    playerStore.characterName = save.data.characterName;
    playerStore.playerAbilities = save.data.playerAbilities;
    playerStore.playerGroup = save.data.playerGroup;
    playerStore.playerUnit = playerUnit;
    itemStore.playerItemContainers = save.data.playerItemContainers;
    worldStore.time = save.data.time;
    locationStore.playerLocation = save.data.playerLocation;
    skillStore.skills = save.data.skills;
    npcStore.npcs = save.data.npcs;

    navigateTo("/game");
  }

  function loadLatestSave() {
    if (saves.value.length) {
      const save = saves.value[0];
      loadSave(save);
    }
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
      console.error(error);
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
