<template>
  <div class="menu-container" :style="{ top: y + 'px', left: x + 'px' }">
    <div
      v-for="action in props.selectedItem?.item.actions"
      :key="action"
      class="action"
      @click="handleActionClick"
    >
      {{ action }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { type InventoryItem } from "@/stores/player";

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  selectedItem: {
    type: Object as PropType<InventoryItem | null>,
    default: null,
  },
});

function handleActionClick() {
  console.log();
}
</script>
<style lang="scss" scoped>
.menu-container {
  position: absolute;
  background-color: var(--elevation1);
  min-width: 200px;
  z-index: 50;
}
.action {
  padding: 10px;
  cursor: pointer;
}

.action:hover {
  background-color: var(--elevation2);
}
</style>
