<template>
  <div class="unit-container">
    <div class="unit-info"></div>
    <CharacterAvatar
      :avatar="props.unit?.img"
      :size="Size.Large"
      :border-color="props.unit?.isPlayer ? 'forestgreen' : 'firebrick'"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Unit } from "~/types/combat.types";
import { Size } from "~/types/general.types";

const props = defineProps({
  unit: {
    type: Object as PropType<Unit | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.unit-container {
  height: min-content;
  width: min-content;
  display: flex;
  flex-direction: column;
  .unit-info {
    color: black;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
}
</style>
