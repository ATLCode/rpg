<template>
  <div class="sContainer">
    <div class="sSlots">
      <div v-for="saveSlot of saveStore.saves" :key="saveSlot.id" class="sSlot">
        <div>Save Slot</div>
        <div v-if="saveSlot.id" class="saveContent">
          <div>{{ saveSlot.data.characterName }}</div>
          <AButton @click="saveStore.deleteSave(saveSlot.id)">Delete</AButton>
          <AButton hidden @click="saveStore.updateSave(saveSlot.id)"
            >Update Save</AButton
          >
          <AButton @click="saveStore.loadSave(saveSlot)">Load Save</AButton>
        </div>
      </div>
      <div v-if="saveStore.saves.length < 5" class="saveEmpty">
        <!-- GoTo /character-creation -->
        <AButton @click="navigateTo('/character-creation')">New Save</AButton>
      </div>
    </div>
    <div class="otherStuff">
      <AButton background-color="red" @click="saveStore.logOut"
        >Log Out</AButton
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSaveStore } from "@/stores/save";

const saveStore = useSaveStore();
saveStore.getUserSaves();

definePageMeta({ middleware: ["auth"] });
</script>
<style lang="scss" scoped>
.sContainer {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text);
  gap: 1rem;
  .sSlots {
    width: 30vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .sSlot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--elevation1);
    border-radius: 10px;
    padding: 1rem;
    .saveContent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .saveEmpty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
