<template>
  <div class="shop-container">
    <div class="player-side">
      <h1>Inventory</h1>
      <GameInventory />
    </div>
    <div class="middle">
      <div class="shop-info">
        <div>
          <h1>{{ props.npc.name }}'s Shop</h1>
        </div>
        <div class="img-container">
          <img :src="npc.img" class="npc-img" alt="" />
        </div>
        <div>Gold:{{ props.npc.shop!.currentMoney }}</div>
      </div>
      <AButton @click="emit('close')">Exit</AButton>
    </div>
    <div class="shop-side">
      <h1>Stock</h1>
      <div class="shop-stock">
        <GameItem
          v-for="(item, index) in props.npc.shop!.stock"
          :key="index"
          :shop-item="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Npc } from "~/game/npcs";

const emit = defineEmits(["close"]);

const props = defineProps({
  npc: {
    type: Object as PropType<Npc>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.shop-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
.player-side {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: center;
  justify-content: center;
}
.middle {
  height: 100%;
  padding: 0rem 1rem;
  display: flex;
  flex-direction: column;
}
.shop-side {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: center;
}
.shop-info {
  text-align: center;
}

.img-container {
  max-height: 200px;
  max-width: 200px;
}
.npc-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.shop-stock {
  display: flex;
  gap: 10px;
}
.shop-item-container {
  height: 50px;
  width: 100px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  padding: 0.5rem;
}
</style>
