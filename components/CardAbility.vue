<template>
  <div
    class="ability-container"
    :class="{ active: props.ability.id === selectedAbilityId }"
    @click="emit('selectAbility')"
  >
    <div>Name: {{ props.ability.name }}</div>
    <div>Cost: {{ props.ability.cost }}</div>
  </div>
</template>
<script lang="ts" setup>
import type { Ability } from "~/game/abilities";

const props = defineProps({
  ability: {
    type: Object as PropType<Ability>,
    required: true,
  },
  selectedAbilityId: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["selectAbility"]);
</script>
<style lang="scss" scoped>
.ability-container {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--elevation1);
  padding: 1rem;
  border-radius: 10px;
}
.active {
  border: 1px solid var(--elevation3);
}
</style>
