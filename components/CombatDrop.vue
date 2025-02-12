<template>
  <div
    v-for="drop in combatStore.combatDrops"
    :key="drop.id"
    class="drop-container"
    :class="{
      'damage-drop': drop.effectType === EffectType.Damage,
      'heal-drop': drop.effectType === EffectType.Heal,
    }"
  >
    <div
      v-if="
        props.coordinates &&
        props.coordinates.x === drop.coordinates.x &&
        props.coordinates.y === drop.coordinates.y
      "
    >
      {{ drop.value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCombatStore } from "@/stores/combat";
import { EffectType, type CombatTile } from "~/types/combat.types";
import type { Coordinates } from "~/types/general.types";

const combatStore = useCombatStore();

const props = defineProps({
  tile: {
    type: Object as PropType<CombatTile | null>,
    default: null,
  },
  coordinates: {
    type: Object as PropType<Coordinates | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.drop-container {
  z-index: 999999;
  font-size: xx-large;
  font-weight: bold;
  position: relative;
  top: -70px;
  left: -80px;
}
.damage-drop {
  color: red;
}
.heal-drop {
  color: green;
}
</style>
