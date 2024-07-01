<template>
  <div class="shop-container">
    <div class="player-side">
      <GameMenuInventory />
    </div>
    <div class="middle"><AButton @click="emit('close')">Exit</AButton></div>
    <div class="shop-side">
      <div class="shop-stock">
        <div
          v-for="item in props.npc.shop!.stock"
          :key="item.itemId"
          class="shop-item-container"
        >
          <div>{{ item.itemId }}</div>
          <div>{{ item.currentStackSize }}</div>
        </div>
      </div>
      <div class="shop-info">
        <div>
          <h1>{{ props.npc.name }}'s Shop</h1>
        </div>
        <div class="img-container">
          <img :src="npc.img" class="npc-img" alt="" />
        </div>
        <div>Money:{{ props.npc.shop!.currentMoney }}</div>
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
}
.middle {
  height: 100%;
  padding: 0rem 1rem;
}
.shop-side {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
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
