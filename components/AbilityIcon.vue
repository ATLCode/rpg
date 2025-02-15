<template>
  <div class="ability-icon-container">
    <div v-if="onCooldown" class="cooldown">
      {{
        combatStore.currentTurnUnit?.cooldowns.find(
          (cd) => cd.abilityId === props.abilityId
        )?.cooldown
      }}
    </div>
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
  if (!props.abilityId || !combatStore.currentTurnUnit) {
    return true;
  }

  const ability = abilities[props.abilityId];
  const canCast = combatStore.hasAbilityCost(ability);

  if (!canCast || onCooldown.value) {
    return true;
  } else {
    return false;
  }
});

const onCooldown = computed(() => {
  if (!props.abilityId || !combatStore.currentTurnUnit) {
    return true;
  }

  const onCooldown = combatStore.currentTurnUnit.cooldowns.find(
    (cooldown) => cooldown.abilityId === props.abilityId
  );
  if (onCooldown) {
    return true;
  } else {
    return false;
  }
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
.ability-icon-container {
  display: flex;
}
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
.cooldown {
  position: absolute;
  padding-left: 5px;
  padding-top: 3px;
  z-index: 999;
}
</style>
