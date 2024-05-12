<template>
  <div class="sContainer">
    <div class="sSlots">
      <div v-for="saveSlot of saveStore.saves" :key="saveSlot.id" class="sSlot">
        <div v-if="saveSlot.id" class="saveContent">
          <h1>{{ saveSlot.data.characterName }}</h1>
          <div class="save-actions">
            <AButton @click="saveStore.loadSave(saveSlot)">Load Save</AButton>
            <AButton
              background-color="--error"
              @click="saveStore.deleteSave(saveSlot.id)"
              >Delete</AButton
            >
          </div>
        </div>
      </div>
      <div v-if="saveStore.saves.length < 5" class="saveEmpty">
        <!-- GoTo /character-creation -->
        <AButton @click="navigateTo('/character-creation')">New Save</AButton>
      </div>
    </div>
    <div class="other-stuff">
      <AButton background-color="--error" @click="saveStore.logOut"
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
  .save-actions {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}
.other-stuff {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
