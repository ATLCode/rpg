<template>
  <div class="inv-container">
    <div class="inv-header">Inventory</div>
    <div class="inv-content">
      <div
        v-for="itemId in playerStore.inventory"
        :key="itemId"
        class="inv-slot"
      >
        <div v-if="itemId === null">Empty</div>
        <div v-if="itemId !== null">Item</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
.inv-container {
  height: 100%;
  width: 100%;
  .inv-header {
  }
  .inv-content {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    border: 1px grey solid;
    padding: 5rem;
  }
  .inv-slot {
    border: 1px solid red;
  }
}
</style>
