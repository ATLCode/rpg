<template>
  <AModal
    v-if="spotComponent === 'Modal'"
    v-model="model"
    :title="selectedSpot?.name"
    closable
  >
    <SpotRefine
      v-if="selectedSpot?.spotType === SpotType.Craft"
      :spot="selectedSpot"
    />
    <SpotRest
      v-if="selectedSpot?.spotType === SpotType.Rest"
      :spot="selectedSpot"
    />
  </AModal>
  <ACard
    v-if="spotComponent === 'Card' && model"
    position="absolute"
    z-index="999"
    :offset="['auto', '0px', '0px', '0px']"
    :margin="['auto', 'auto', 'auto', 'auto']"
    padding="1rem"
    width="1200px"
    height="15vh"
  >
    <SpotGather
      v-if="selectedSpot?.spotType === SpotType.Gather"
      :spot="selectedSpot"
      @close="closeInfo"
    />
  </ACard>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { SpotType } from "~/types/spot.types";
import { pins } from "~/game/locations";
import { PinType } from "~/types/location.types";
import { SpotId, spots } from "~/game/spots";

const locationStore = useLocationStore();

const model = defineModel({ type: Boolean });

const selectedSpot = computed(() => {
  if (pins[locationStore.playerLocation.pinId].type === PinType.Spot) {
    return spots[pins[locationStore.playerLocation.pinId].target as SpotId];
  }
  return null;
});

const spotComponent = computed(() => {
  if (!selectedSpot.value) {
    return undefined;
  }

  const modalSpots = [SpotType.Craft, SpotType.Rest];
  const cardSpots = [SpotType.Gather];

  if (modalSpots.includes(selectedSpot.value.spotType)) {
    return "Modal";
  }
  if (cardSpots.includes(selectedSpot.value.spotType)) {
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
</style>
