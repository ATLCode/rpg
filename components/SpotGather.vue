<template>
  <div v-if="spotStore.loading"></div>
  <div v-else class="action-container">
    <div class="spot-img">
      <div>{{ spotStore.selectedSpot?.name }}</div>
      <ASpacer />
      <img :src="spotStore.selectedSpot?.img" alt="image" />
    </div>
    <div v-if="false">{{ spotStore.selectedSpot }}</div>
    <div class="center">
      <div>
        Action Text
        {{
          spotStore.currentActionProgress + " " + spotStore.currentActionLength
        }}
      </div>
      <AProgressLinear
        v-model="spotStore.currentActionProgress"
        :max="spotStore.currentActionLength"
        height="2.5rem"
        width="100%"
      />
    </div>

    <ASpacer />
    <AButton v-if="!spotStore.actionOngoing" @click="spotStore.startAction"
      >START</AButton
    >
    <AButton v-else background-color="--error" @click="spotStore.stopAction"
      >STOP</AButton
    >
  </div>
</template>

<script lang="ts" setup>
import { useSpotStore } from "@/stores/spot";
// Decide how to deal with multiple different type of spots, gather, craft etc

const spotStore = useSpotStore();
</script>

<style lang="scss" scoped>
.action-container {
  height: 100%;
  width: 100%;
  z-index: 450;
  padding: 0.5rem;
  margin: auto;
  display: flex;
}
.spot-img {
  height: 100%;
  display: flex;
  flex-direction: column;
}
img {
  max-height: 100px;
  max-width: 100px;
}
.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0rem 1rem;
  gap: 1rem;
  text-align: center;
}
</style>
