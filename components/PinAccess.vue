<template>
  <AModal v-model="model" :title="locationStore.selectedPin?.name" closable>
    <div class="exit">
      <AButton @click="access">Exit</AButton>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";

const locationStore = useLocationStore();

const model = defineModel({ type: Boolean });

function closeInfo() {
  model.value = false;
}
function access() {
  locationStore.goToLocation(locationStore.selectedPin?.target); // How to fix
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
