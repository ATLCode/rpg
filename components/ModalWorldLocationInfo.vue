<template>
  <div class="info-container">
    <div class="close">
      <AButton variant="plain" @click="closeInfo">X</AButton>
    </div>
    <div
      v-if="
        locationStore.selectedLocation?.id ===
        locationStore.playerLocation.worldLocation.id
      "
    >
      <h2>{{ locationStore.selectedLocation.name }}</h2>
      <AButton @click="locationStore.enterArea()">Enter</AButton>
    </div>
    <div v-else-if="locationStore.selectedLocationInCurrentPaths">
      <h2>{{ locationStore.selectedPath?.name }}</h2>
      <div>Energy cost: {{ locationStore.selectedPath?.energyCost }}</div>
      <div>Time cost: {{ locationStore.selectedPath?.timeCost }}</div>
      <AButton @click="locationStore.travelPath()">Travel</AButton>
    </div>
    <div v-else>
      <h4>You cannot reach this location from where you are</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";

const locationStore = useLocationStore();

const emit = defineEmits(["close"]);
function closeInfo() {
  emit("close");
}
</script>

<style lang="scss" scoped>
.info-container {
  z-index: 999;
  position: absolute;
  width: 500px;
  min-height: 5rem;
  background-color: var(--elevation1);
  border: 1px solid var(--elevation2);
  bottom: 0;
  left: 0;
  right: 0;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
