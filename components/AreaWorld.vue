<template>
  <div class="world-container">
    <h1>{{ locationStore.currentArea.name }}</h1>
    Current Location: {{ locationStore.currentLocation }}
    <div v-if="settingStore.showMap === false" class="world-info">
      <div class="locations">
        <div
          v-for="location in locationStore.currentLocations"
          :key="location.id"
          class="location-card"
          :class="{
            active: location.id === props.selectedLocation.id,
          }"
          @click="$emit('changeSelectedLocation', location.id)"
        >
          <div>{{ location.name }}</div>
          <div v-if="location.id === locationStore.currentLocation.id">
            <img src="../assets/icons/helmet.svg" class="character" alt="" />
          </div>
        </div>
      </div>
      <div class="selected-location">
        <EnterLocation
          v-if="selectedLocation.id === locationStore.currentLocation.id"
        />
        <PathInfo
          v-if="
            !(props.selectedLocation.id === locationStore.currentLocation.id) &&
            locationStore.currentArea.id === 0
          "
          :path="selectedPath"
        />
      </div>
    </div>
    <div v-else class="world-map">
      <GameMap />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { type Location } from "@/game/locations";
import { useSettingStore } from "@/stores/setting";
const locationStore = useLocationStore();
const settingStore = useSettingStore();

defineEmits(["changeSelectedLocation"]);
const props = defineProps<{
  selectedLocation: Location;
}>();

const paths = locationStore.currentPaths;

const selectedPath = computed(() => {
  return paths.find((path) =>
    path.locations.includes(locationStore.currentLocation.id)
  );
});
</script>

<style lang="scss" scoped>
.world-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.world-info {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}
.locations {
  padding: 1rem;
}
.location-card {
  height: 100px;
  width: 30vw;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  &.active {
    font-weight: bold;
    background-color: var(--elevation1);
  }
  &.path {
    filter: drop-shadow(0 0 5px white);
  }
  .character {
    height: 50px;
  }
}
.world-map {
  height: 100%;
  width: 100%;
}
</style>
