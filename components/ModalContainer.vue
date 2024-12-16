<template>
  <AModal v-model="model" :title="props.areaLocation?.name" closable>
    <div class="content">
      <div>
        Outside image from areaLocation here
        {{ props.areaLocation?.containerDetails?.outsideImg }}
      </div>
      <AButton @click="enterSubLocation">Enter</AButton>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { useLocationStore } from "@/stores/location";
import type { AreaLocation, PlayerLocation } from "~/types/location.types";
import { subLocations } from "~/game/locations";

const locationStore = useLocationStore();

const model = defineModel({ type: Boolean });

const props = defineProps({
  areaLocation: {
    type: Object as PropType<AreaLocation | null>,
    required: false,
    default() {
      return undefined;
    },
  },
});

function enterSubLocation() {
  const target = props.areaLocation?.containerDetails?.child;

  if (!target) {
    throw new Error("No prop area location or area location isn't container");
  }

  const newLocation: PlayerLocation = {
    worldLocation: locationStore.playerLocation.worldLocation,
    areaLocation: locationStore.playerLocation.areaLocation,
    subLocation: subLocations[target],
  };
  locationStore.goToLocation(newLocation);
  console.log("Test");
  console.log(locationStore.playerLocation);
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
