export const useSaveStore = defineStore("save", () => {
  /* 
    Save includes:
    -Player
    -World
  */

  /* 
  Verkku: How do we show for example 5 save slots. If you have 3 saves, we should show those and 2 empty ones?
   Do we fill saves array in store with slots that are ampty or what?
  */
  /*
  type Save = {
    id: string;
  };
  */

  const saves = ref<any[]>([]);

  async function getUserSaves() {
    const { data } = await useFetch("/api/saves/get-for-user");
    saves.value = data.value as any[];
  }

  async function updateSave(saveId: number) {
    try {
      await $fetch("/api/saves/update", {
        method: "POST",
        body: {
          saveId,
          save: "saveeemee",
        },
      });
      getUserSaves();
    } catch (error) {
      // console.error(error);
    }
  }

  async function createSave() {
    try {
      await $fetch("/api/saves/add", {
        method: "POST",
        body: {
          save: "",
        },
      });
      getUserSaves();
    } catch (error) {
      // console.error(error);
    }
  }
  async function deleteSave(saveId: number) {
    try {
      await $fetch("/api/saves/delete", {
        method: "POST",
        body: {
          saveId,
          save: "saveeemee",
        },
      });
      getUserSaves();
    } catch (error) {
      // console.error(error);
    }
  }

  return { saves, updateSave, createSave, deleteSave, getUserSaves };
});
