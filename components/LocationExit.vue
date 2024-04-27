<template>
  <div class="exit-container">
    <div class="exit-bar">
      <AButton
        class="exit-btn"
        background-color="--elevation1"
        @click="$emit('back')"
        >Back to {{ locationStore.currentArea.name }}</AButton
      >
      <h1>
        {{ locationStore.currentArea.name }} -
        {{ locationStore.currentLocation.name }}
      </h1>
    </div>

    <div class="exit-content">
      <AButton @click="locationStore.exitArea()"
        >Exit {{ locationStore.currentArea.name }}</AButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
const locationStore = useLocationStore();

defineEmits(["back"]);
</script>

<style lang="scss" scoped>
.exit-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.exit-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .exit-btn {
    position: absolute;
    left: 1rem;
  }
}

.exit-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
