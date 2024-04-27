<template>
  <div class="camp-container">
    <div class="camp-header">
      <ASpacer />
      <h1>Camp</h1>
      <ASpacer />
      <AButton background-color="var(--elevation1)" @click="$emit('close')"
        >Close</AButton
      >
    </div>
    <div class="camp-content">
      <CardSpot
        v-for="spot in locationStore.camp.spots"
        :key="spot.name"
        :spot="spot"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
const locationStore = useLocationStore();
defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.camp.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.camp-header {
  display: flex;
  flex-direction: row;
}
.camp-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
}
</style>
