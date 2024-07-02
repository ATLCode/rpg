<template>
  <div v-if="!showShop" class="npc-container">
    <div>{{ npc.name }}</div>
    <div>{{ npc.title }}</div>
    <div class="img-container">
      <img :src="npc.img" class="npc-img" alt="" />
    </div>
    <AButton v-if="npc.shop" @click="showShop = true">Shop</AButton>
  </div>

  <InterfaceShop v-if="showShop" :npc="npc" @close="showShop = false" />
</template>

<script lang="ts" setup>
import { NpcId } from "@/game/npcs";
import { useNpcStore } from "~/stores/npc";

const npcStore = useNpcStore();

const props = defineProps({
  npcId: {
    type: Number as PropType<NpcId>,
    required: true,
  },
});

const npc = computed(() => {
  return npcStore.npcs[props.npcId];
});

const showShop = ref(false);
</script>

<style lang="scss" scoped>
.npc-container {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  padding: 1rem;
  gap: 0.5rem;
}
.npc-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.img-container {
  max-height: 200px;
  max-width: 200px;
}
</style>
