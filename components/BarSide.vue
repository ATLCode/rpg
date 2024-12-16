<template>
  <div class="bar">
    <BarSideExtension
      v-if="showExtension"
      :open-tab="openTab"
      @close="closeExtension"
    />
    <div class="bar-content">
      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: openTab === 'Inventory' }"
        @click="openExtension('Inventory')"
        >Inventory</AButton
      >

      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: openTab === 'Skills' }"
        @click="openExtension('Skills')"
        >Skills</AButton
      >

      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: openTab === 'Abilities' }"
        @click="openExtension('Abilities')"
        >Abilities</AButton
      >

      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: openTab === 'Quests' }"
        @click="openExtension('Quests')"
        >Quests</AButton
      >

      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: openTab === '' }"
        @click="goToCamp"
        >Camp</AButton
      >
    </div>
  </div>

  <AModal v-model="showMenu" :fullscreen="true">
    <GameMenu :initial-tab="openTab" @close="closeExtension" />
  </AModal>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { MapId, PinId } from "~/game/locations";

const locationStore = useLocationStore();

const showMenu = ref(false);

const showExtension = ref(false);
const openTab = ref<string | undefined>(undefined);

/*
function openMenu(tab: string) {
  openTab.value = tab;
  showMenu.value = true;
}
*/

function openExtension(tab: string) {
  openTab.value = tab;
  showExtension.value = true;
}
function closeExtension() {
  openTab.value = undefined;
  showExtension.value = false;
}

function goToCamp() {
  locationStore.campReturnLocation = locationStore.playerLocation;
  locationStore.goToLocation({
    mapId: MapId.Camp,
    pinId: PinId.CampEdge,
  });
}
</script>

<style lang="scss" scoped>
.bar {
  height: 70vh;
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;

  .bar-content {
    width: 6rem;
    height: fit-content;
    display: flex;
    flex-direction: column;
    z-index: 500;
    .selected {
      background-color: var(--elevation2) !important;
    }
  }
}
</style>
