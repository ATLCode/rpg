<template>
  <div v-if="spotStore.loading"></div>
  <div v-else class="gather-container">
    <div class="gather-header">
      <ASpacer />
      <div>{{ spotStore.selectedSpot?.name }}</div>
      <ASpacer />
      <AButton variant="plain" padding="0rem" @click="$emit('close')"
        >X</AButton
      >
    </div>
    <div class="gather-content">
      <div class="spot-img">
        <ASpacer />
        <img :src="spotStore.selectedSpot?.img" alt="image" />
        <ASpacer />
      </div>
      <div v-if="false">{{ spotStore.selectedSpot }}</div>
      <div class="center">
        <div>
          Action Text
          {{
            spotStore.currentActionProgress +
            " " +
            spotStore.currentActionLength
          }}
        </div>
        <div class="progress-buttons">
          <AProgressLinear
            v-model="spotStore.currentActionProgress"
            :max="spotStore.currentActionLength"
            height="2.5rem"
            width="100%"
          />
          <AButton
            v-if="!spotStore.actionOngoing"
            @click="spotStore.startAction"
            >START</AButton
          >
          <AButton
            v-else
            background-color="--error"
            @click="spotStore.stopAction"
            >STOP</AButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSpotStore } from "@/stores/spot";
// Decide how to deal with multiple different type of spots, gather, craft etc

const spotStore = useSpotStore();

defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.gather-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.gather-header {
  width: 100%;
  display: flex;
  justify-content: center;
}
.gather-content {
  height: 100%;
  width: 100%;
  z-index: 450;
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
.progress-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
