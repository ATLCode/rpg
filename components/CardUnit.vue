<template>
  <div class="unit-card">
    <div class="unit-name">{{ props.unit.name }}</div>
    <div class="img-container">
      <img :src="unit.img" class="unit-img" alt="" />
    </div>
    <AProgressLinear
      v-model="unit.currentHealth"
      :max="unit.maxHealth"
      color="var(--error)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Unit } from "~/types/combat.types";

const props = defineProps({
  unit: {
    type: Object as PropType<Unit>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.unit-card {
  align-self: center;
  border: 1px solid var(--elevation2);
  background-color: var(--elevation1);
  height: 200px;
  width: 160px;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--error);
  }
}
.unit-name {
  text-align: center;
}
.unit-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
