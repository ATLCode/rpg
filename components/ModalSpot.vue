<template>
  <AModal
    v-model="spotStore.spotModalOpen"
    :title="modalSettings.title"
    :height="modalSettings.height"
    :margin="modalSettings.margin"
    :persistent="modalSettings.persistent"
    closable
  >
    <SpotRefine v-if="spotStore.selectedSpot?.spotType === SpotType.Craft" />
    <SpotGather v-if="spotStore.selectedSpot?.spotType === SpotType.Gather" />
  </AModal>
</template>

<script lang="ts" setup>
import { useSpotStore } from "@/stores/spot";
import { SpotType } from "~/types/spot.types";
// Decide how to deal with multiple different type of spots, gather, craft etc

const spotStore = useSpotStore();

// Wait can I just have to AModals with v-ifs based on what kind of selectedSpots type is?
// Or should I just not use AModal here and make this the actual container?

const modalSettings = computed(() => {
  const type = spotStore.selectedSpot?.spotType;
  const smallModals = [SpotType.Gather];
  const modalSettings = {
    title: spotStore.selectedSpot?.name,
    height: "700px",
    margin: ["0px", "0px", "0px", "0px"],
    persistent: true,
  };
  if (type === undefined) {
    return modalSettings;
  } else if (smallModals.includes(type)) {
    modalSettings.title = "";
    modalSettings.height = "150px";
    modalSettings.margin = ["auto", "0px", "0px", "0px"];
    modalSettings.persistent = false;
  }
  return modalSettings;
});
</script>

<style lang="scss" scoped>
.spot-img {
  height: 100%;
  display: flex;
  flex-direction: column;
}
img {
  max-height: 100px;
  max-width: 100px;
}
.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 1rem;
  gap: 1rem;
  text-align: center;
}
</style>
