<template>
  <div class="npc-container">
    <div>{{ npc.name }}</div>
    <div>{{ npc.title }}</div>
    <div class="img-container">
      <img :src="npc.img" class="npc-img" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NpcId, npcs } from "@/game/npcs";

const props = defineProps({
  npcId: {
    type: Number as PropType<NpcId>,
    required: true,
  },
});

const npc = computed(() => {
  return npcs[props.npcId];
});
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
