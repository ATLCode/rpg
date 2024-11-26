<template>
  <AModal v-if="spotComponent === 'Modal'" v-model="model" closable>
    test
    <SpotRefine v-if="spotStore.selectedSpot.spotType === SpotType.Craft" />
  </AModal>
  <ACard
    v-if="spotComponent === 'Card' && model"
    position="absolute"
    z-index="999"
    :offset="['auto', '0px', '0px', '0px']"
    :margin="['auto', 'auto', 'auto', 'auto']"
    padding="1rem"
    width="1000px"
    height="150px"
  >
    <SpotGather
      v-if="spotStore.selectedSpot.spotType === SpotType.Gather"
      @close="closeInfo"
    />
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

function closeInfo() {
  model.value = false;
}
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
