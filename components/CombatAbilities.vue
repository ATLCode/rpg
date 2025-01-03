<template>
  <div class="abilities-container">
    <div class="quick-abilities">Quick Abilities</div>
    <div class="rest-abilities">
      All Abilities
      <div
        v-for="(ability, index) in props.unit?.abilities"
        :key="index"
        class="ability"
      >
        {{ abilities[ability].name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { abilities } from "~/game/abilities";
import type { Unit } from "~/types/combat.types";

const props = defineProps({
  unit: {
    type: Object as PropType<Unit | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.abilities-container {
  height: 200px;
  width: 500px;
  display: flex;
  background-color: var(--elevation2);
  display: flex;
  flex-direction: column;
}
</style>
