<template>
  <div class="abilities-container">
    <div class="rest-abilities">
      <div v-if="hoveredAbility" class="ability-info">
        <h3>{{ hoveredAbility?.name }}</h3>
        <div>Type:{{ hoveredAbility.cost }}</div>
        <div>Cost:{{ hoveredAbility.energyCost }}</div>
        <h4>Effects</h4>
        <div v-for="(effect, index) in hoveredAbility.effects" :key="index">
          <div v-if="effect.effectType === EffectType.Damage">
            • Deals {{ effect.value }} {{ effect.damageType }} damage
          </div>
          <div v-if="effect.effectType === EffectType.Move">
            • Move X squares
          </div>
          <div v-if="effect.effectType === EffectType.Heal">
            • Heals {{ effect.value }} HP
          </div>
        </div>
      </div>
      <div
        v-for="(abilityId, index) in props.unit?.abilities"
        :key="index"
        class="ability"
        @mouseover="hoveredAbility = abilities[abilityId]"
        @mouseleave="hoveredAbility = null"
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
import { abilities } from "~/game/abilities";
import { EffectType, type Ability, type Unit } from "~/types/combat.types";

defineEmits(["select-ability"]);
const props = defineProps({
  unit: {
    type: Object as PropType<Unit | null>,
    default: null,
  },
});

const hoveredAbility = ref<Ability | null>(null);
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
.ability-info {
  position: absolute;
  background-color: var(--elevation2);
  padding: 1rem;
  top: -150px;
  border-radius: 5px;
}
</style>
