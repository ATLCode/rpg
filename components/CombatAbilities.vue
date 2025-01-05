<template>
  <div class="abilities-container">
    <div class="quick-abilities">
      <div
        class="ability"
        @click="$emit('select-ability', abilities[AbilityId.Move])"
      >
        <img src="/public/icons/circle.png" alt="" />
      </div>
    </div>
    <div class="rest-abilities">
      All Abilities
      <div
        v-for="(abilityId, index) in props.unit?.abilities"
        :key="index"
        class="ability"
      >
        {{ abilities[abilityId].name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { abilities, AbilityId } from "~/game/abilities";
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
  height: 200px;
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
</style>
