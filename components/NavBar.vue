<template>
  <div class="nav">
    <AButton @click="settingStore.changeMap"
      >MapView: {{ settingStore.showMap }}</AButton
    >

    <ASpacer />
    <div class="btn-div">
      <AButton
        background-color="var(--elevation1)"
        @click="openMenu('Inventory')"
        >Inventory</AButton
      >
    </div>
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="openMenu('Skills')"
        >Skills</AButton
      >
    </div>
    <div class="btn-div">
      <AButton
        background-color="var(--elevation1)"
        @click="openMenu('Abilities')"
        >Abilities</AButton
      >
    </div>
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="openMenu('Quests')"
        >Quests</AButton
      >
    </div>
    <ASpacer />
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="showCamp = true"
        >Camp</AButton
      >
    </div>
  </div>

  <ADialog v-model="showMenu" :fullscreen="true">
    <GameMenu :initial-tab="openTab" @close="showMenu = false" />
  </ADialog>
  <ADialog v-model="showCamp" :fullscreen="true">
    <LocationCamp @close="showCamp = false" />
  </ADialog>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@/stores/setting";

const settingStore = useSettingStore();

const showMenu = ref(false);
const showCamp = ref(false);
const openTab = ref("");

function openMenu(tab: string) {
  openTab.value = tab;
  showMenu.value = true;
}
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  padding: 0.5rem;
  z-index: 500;
}
</style>
