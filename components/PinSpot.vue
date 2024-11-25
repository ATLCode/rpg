<template>
  <AModal v-if="spotComponent === 'Modal'" v-model="model" closable>
    test
    <SpotRefine v-if="spotStore.selectedSpot.spotType === SpotType.Craft" />
  </AModal>
  <ACard v-if="spotComponent === 'Card'">
    asd
    <SpotGather v-if="spotStore.selectedSpot.spotType === SpotType.Gather" />
  </ACard>
</template>

<script lang="ts" setup>
import { useSpotStore } from "@/stores/spot";

import { SpotType } from "~/types/spot.types";

const spotStore = useSpotStore();

const model = defineModel({ type: Boolean });

const spotComponent = computed(() => {
  if (!spotStore.selectedSpot) {
    return undefined;
  }

  const modalSpots = [SpotType.Craft, SpotType.Sleeping];
  const cardSpots = [SpotType.Gather];

  if (modalSpots.includes(spotStore.selectedSpot.spotType)) {
    return "Modal";
  }
  if (cardSpots.includes(spotStore.selectedSpot.spotType)) {
    return "Card";
  }
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
