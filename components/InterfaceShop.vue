<template>
  <div class="shop-container">
    <div class="player-side">
      <h1>Inventory</h1>
      <GameInventory :shop="true" />
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
      <SelectedItem :npc="props.npc" />
      <ASpacer />
      <AButton background-color="--error" @click="emit('close')">Exit</AButton>
    </div>
    <div class="shop-side">
      <h1>Stock</h1>
      <div class="shop-stock">
        <GameItem
          v-for="item in props.npc.shop!.stock"
          :key="item.index"
          :game-item="item"
          :context-mode="ContextMode.Buy"
          :selectable="true"
          :selected-item="playerStore.selectedItem"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ContextMode, type GameItem } from "../types/item.types";
import type { Npc } from "~/game/npcs";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();

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
  gap: 0.5rem;
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  height: 100%;
  width: 100%;
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
