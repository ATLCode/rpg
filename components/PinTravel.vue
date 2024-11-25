<template>
  <ACard
    v-if="model"
    position="absolute"
    z-index="999"
    :offset="['auto', '0px', '0px', '0px']"
    :margin="['auto', 'auto', 'auto', 'auto']"
    width="500px"
    height="150px"
  >
    <div class="container">
      <div class="header">
        <ASpacer />
        {{ cardInfo.title }}
        <ASpacer />
        <AButton variant="plain" padding="0rem" @click="closeInfo()">X</AButton>
      </div>
      <div class="actions">
        <AButton v-if="cardInfo.state === 'enter'" @click="enterArea"
          >Enter</AButton
        >
        <AButton
          v-if="cardInfo.state === 'travel'"
          @click="locationStore.travelPath"
          >Travel</AButton
        >
        <div v-if="cardInfo.state === 'neither'">
          You can't travel here from your current location
        </div>
      </div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { pins } from "~/game/locations";

const locationStore = useLocationStore();

const model = defineModel({ type: Boolean });

function closeInfo() {
  model.value = false;
}

const cardInfo = computed(() => {
  const info = {
    state: "",
    title: "",
  };
  if (locationStore.selectedPin?.id === locationStore.playerLocation.pinId) {
    info.state = "enter";
    info.title = pins[locationStore.playerLocation.pinId].name;
  } else if (locationStore.selectedPath) {
    info.state = "travel";
    info.title = locationStore.selectedPath.name;
  } else if (!locationStore.selectedPath) {
    info.state = "neither";
  }

  return info;
});

function enterArea() {
  locationStore.goToLocation(locationStore.selectedPin?.target); // How to fix this?
  closeInfo();
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.header {
  display: flex;
  justify-content: center;
}
.actions {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
