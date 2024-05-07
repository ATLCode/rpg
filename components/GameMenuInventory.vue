<template>
  <div class="inv-container">
    <div class="inv-header">Inventory</div>
    <div class="inv-content">
      <div
        v-for="item in playerStore.inventory"
        :key="item?.id"
        class="inv-slot"
      >
        <div v-if="item?.id" class="item-slot">
          <div>{{ item.name }}</div>
          <div class="item-img">
            <img :src="item.img" class="item-icon" alt="" />
          </div>
        </div>
        <div v-else>Empty</div>
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
  border: 1px grey solid;
  .inv-header {
  }
  .inv-content {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

    padding: 5rem;
  }
  .item-icon {
    height: 48px;
    width: 48px;
  }
  .item-slot {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .inv-slot {
    border: 1px solid red;
  }
}
</style>
