<template>
  <div>
    <NuxtLayout class="layout">
      <ModalNotification />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useSaveStore } from "@/stores/save";
const client = useSupabaseClient();
const saveStore = useSaveStore();
onMounted(async () => {
  const { data } = await client.auth.getSession();
  if (!data.session) {
    return;
  }
  await saveStore.getUserSaves();
  if (saveStore.saves.length) {
    saveStore.loadLatestSave();
  }
});
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
