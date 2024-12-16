<template>
  <AModal v-model="model" :title="locationStore.selectedPin?.name" closable>
    <div class="exit">
      <AButton @click="access">Exit</AButton>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { PinType, type Location } from "~/types/location.types";

const locationStore = useLocationStore();

const model = defineModel({ type: Boolean });

function closeInfo() {
  model.value = false;
}
function access() {
  if (
    !locationStore.selectedPin ||
    locationStore.selectedPin.type !== PinType.Access
  ) {
    throw new Error("No selected Pin");
  }

  const pinTarget = locationStore.selectedPin.target as Location;

  if ((pinTarget as any) === "ExitCamp") {
    // Camp Exit Case
    if (!locationStore.campReturnLocation) {
      throw new Error("Return location is null");
    }
    locationStore.goToLocation(locationStore.campReturnLocation);
  } else {
    // Normal Case
    locationStore.goToLocation(pinTarget);
  }
  // All Cases
  closeInfo();
}
</script>

<style lang="scss" scoped>
.exit {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
