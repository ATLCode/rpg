<template>
  <div class="abilities-container">
    <div class="rest-abilities">
      <div
        v-for="(abilityId, index) in props.unit?.abilities"
        :key="index"
        class="ability"
      >
        <AbilityIcon
          :ability-id="abilityId"
          @select-ability="(n) => $emit('select-ability', n)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Unit } from "~/types/combat.types";

defineEmits(["select-ability"]);
const props = defineProps({
  unit: {
    type: Object as PropType<Unit | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.abilities-container {
  height: 84px;
  width: 500px;
  display: flex;
  background-color: var(--elevation2);
  display: flex;
  flex-direction: column;
}
img {
  max-height: 48px;
  max-width: 48px;
}
.ability:hover {
  cursor: pointer;
}
.rest-abilities {
  display: flex;
}
</style>
