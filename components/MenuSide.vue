<template>
  <div class="nav">
    <ASpacer />

    <AButton background-color="var(--elevation1)" @click="openMenu('Inventory')"
      >Inventory</AButton
    >

    <AButton background-color="var(--elevation1)" @click="openMenu('Skills')"
      >Skills</AButton
    >

    <AButton background-color="var(--elevation1)" @click="openMenu('Abilities')"
      >Abilities</AButton
    >

    <AButton background-color="var(--elevation1)" @click="openMenu('Quests')"
      >Quests</AButton
    >

    <AButton background-color="var(--elevation1)" @click="goToCamp"
      >Camp</AButton
    >
    <ASpacer />
  </div>

  <AModal v-model="showMenu" :fullscreen="true">
    <GameMenu :initial-tab="openTab" @close="showMenu = false" />
  </AModal>
  <AModal v-model="showCamp" :fullscreen="true">
    <MapCamp @close="showCamp = false" />
  </AModal>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { MapId, PinId } from "~/game/locations";

const locationStore = useLocationStore();

const showMenu = ref(false);
const showCamp = ref(false);
const openTab = ref("");

function openMenu(tab: string) {
  openTab.value = tab;
  showMenu.value = true;
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
.nav {
  position: absolute;
  right: 0px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  z-index: 500;
}
</style>
