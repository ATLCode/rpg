<template>
  <div class="ability-icon-container">
    <img
      v-if="props.abilityId"
      :src="abilities[props.abilityId].img"
      :alt="abilities[props.abilityId].img"
      class="ability-icon"
      :class="{ disabled: isDisabled }"
      @click="selectAbility(props.abilityId)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useCombatStore } from "@/stores/combat";
import { abilities, type AbilityId } from "~/game/abilities";

const combatStore = useCombatStore();

const props = defineProps({
  abilityId: {
    type: String as PropType<AbilityId | null>,
    default: null,
  },
});

// Maybe disabled as computed instead

const emit = defineEmits(["select-ability"]);

const isDisabled = computed(() => {
  if (!props.abilityId) {
    return true;
  }
  const ability = abilities[props.abilityId];
  return !combatStore.hasAbilityCost(ability);
});

function selectAbility(abilityId: AbilityId) {
  if (isDisabled.value) {
    return;
  }
  const ability = abilities[abilityId];
  emit("select-ability", ability);
}
</script>

<style lang="scss" scoped>
.ability-icon:hover {
  cursor: pointer;
  opacity: 0.7;
}
.disabled {
  filter: grayscale(100%);
}
img {
  max-height: 48px;
  max-width: 48px;
}
</style>
