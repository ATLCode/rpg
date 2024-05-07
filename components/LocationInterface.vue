<template>
  <div class="interface-container">
    <div class="interface-bar">
      <AButton
        class="exit-btn"
        background-color="--elevation1"
        @click="$emit('back')"
        >Back to {{ locationStore.currentArea.name }}</AButton
      >
      <h1>
        {{ locationStore.currentArea.name }} -
        {{ locationStore.currentLocation.name }}
      </h1>
    </div>
    <div>{{ locationStore.currentResourceSpots }}</div>
    <div class="interface-content">
      <CardSpot
        v-for="spot in locationStore.currentResourceSpots"
        :key="spot.name"
        :spot="spot"
        :current-action-spot-id="currentActionSpotId"
        @new-current-action="newCurrentAction"
      />
      <div v-if="locationStore.currentLocation.id === 9">
        <AButton>Test Combat</AButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";

const locationStore = useLocationStore();

defineEmits(["back"]);

const currentActionSpotId = ref<number | undefined>(undefined);

function newCurrentAction(id: number) {
  currentActionSpotId.value = id;
}
</script>

<style lang="scss" scoped>
.interface-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.interface-bar {
  display: flex;
  justify-content: center;
  height: 100px;
}
.interface-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
}
.exit-btn {
  position: absolute;
  left: 1rem;
}
</style>
