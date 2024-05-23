<template>
  <div class="camp-container">
    <div class="camp-header">
      <AButton background-color="var(--elevation1)" @click="$emit('close')"
        >Close</AButton
      >
      <ASpacer />
      <h1>Camp</h1>
      <ASpacer />
    </div>
    <div class="camp-content">
      <CardRefiningSpot
        v-for="spotId in refiningSpots"
        :key="spotId"
        :spot-id="spotId"
        :current-action-spot-id="currentActionSpotId"
        @new-current-action="newCurrentAction"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RefiningSpotId } from "@/game/spots";
defineEmits(["close"]);

const refiningSpots = ref<RefiningSpotId[]>([RefiningSpotId.Campfire]);

const currentActionSpotId = ref<RefiningSpotId | undefined>(undefined);
function newCurrentAction(id: RefiningSpotId) {
  currentActionSpotId.value = id;
}
</script>

<style lang="scss" scoped>
.camp.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 900;
}
.camp-header {
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
}
.camp-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
}
</style>
