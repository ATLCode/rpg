<template>
  <div class="spot-container">
    <div>{{ spot.name }}</div>
    <div>{{ spot.type }}</div>
    <div>{{ spot.skillId }}</div>
    <div>{{ spot.levelReq }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { type Spot } from "~/game/locations";

defineProps({
  spot: {
    type: Object as PropType<Spot>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.spot-container {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  padding: 1rem;
}
</style>
