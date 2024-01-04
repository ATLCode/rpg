<template>
  <div>
    <h1>Saves</h1>
    <div v-for="saveSlot of saves" key="saveSlot.id">
      {{ saveSlot.save }}
      <button @click="deleteSave(saveSlot.id)">Delete</button>
      <button hidden @click="updateSave(saveSlot.id)">Update Save</button>
    </div>
    <input v-model="newSave" type="text" />
    <button @click="createSave">New Save</button>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });
const saves = ref<any[]>([]);
const newSave = ref("");

async function createSave() {
  try {
    await $fetch("/api/saves/add", {
      method: "POST",
      body: {
        save: newSave.value,
      },
    });
    newSave.value = "";
    getUserSaves();
  } catch (error) {
    console.error(error);
  }
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
    console.error(error);
  }
}

async function getUserSaves() {
  const { data } = await useFetch("/api/saves/get-for-user");
  saves.value = data.value as any[];
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
    console.error(error);
  }
}

getUserSaves();
</script>
<style lang="scss" scoped>
.test {
  font-family: "Rubik Doodle Triangles";
}
</style>
