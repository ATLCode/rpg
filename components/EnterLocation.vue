<template>
  <div class="enter-container">
    <AButton @click="locationStore.enterArea()">Enter</AButton>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
const locationStore = useLocationStore();
</script>

<style lang="scss" scoped>
.enter-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
