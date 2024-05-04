<template>
  <div
    class="spot-container"
    :class="{ disabled: isDisabled }"
    @click="clickCard"
  >
    <div class="spot-header">
      <div>{{ spot.name }}</div>
      <ASpacer />
      <!--
        <div>{{ skillStore.getSkillById(spot.skillId)?.name }}</div>
      -->
      <div>{{ spot.levelReq }}</div>
    </div>
    <div>{{ skillStore.getSkillById(spot.skillId)?.name }}</div>
    <div>Spot Image</div>
    <AProgressLinear v-model="progress" :max="totalSeconds" />
    <div>{{ isDisabled }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { SpotResource, SpotCooking, SpotSleeping } from "@/game/spots";
import { useSkillStore } from "@/stores/skill";
import { usePlayerStore } from "@/stores/player";
const skillStore = useSkillStore();
const playerStore = usePlayerStore();

const props = defineProps({
  spot: {
    type: Object as PropType<SpotResource | SpotCooking | SpotSleeping>,
    default: null,
  },
  currentActionSpotId: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(["newCurrentAction"]);

const totalSeconds = ref(props.spot.interval);
const progress = ref(0);
const isDisabled = computed(() => {
  if (
    props.currentActionSpotId &&
    props.currentActionSpotId !== props.spot.id
  ) {
    return true;
  } else {
    return false;
  }
});

function clickCard() {
  if (isDisabled.value) {
    return;
  }
  startAction();
}

const actionInterval = ref<ReturnType<typeof setTimeout> | undefined>(
  undefined
);

function startAction() {
  console.log(props.currentActionSpotId);
  if (props.currentActionSpotId) {
    stopAction();
    return;
  }
  emit("newCurrentAction", props.spot.id);
  actionInterval.value = setInterval(() => {
    addTime(1);
  }, 1000);
}

function stopAction() {
  console.log("Stopping Action");
  clearInterval(actionInterval.value);
  progress.value = 0;
  emit("newCurrentAction", undefined);
}

function addTime(num: number) {
  progress.value = progress.value + num;
}

const finishedInterval = computed(() => {
  if (progress.value >= totalSeconds.value) {
    return true;
  }
  return false;
});

watch(finishedInterval, () => {
  if (finishedInterval.value === true) {
    getResource();
    progress.value = 0;
  }
});

function getResource() {
  console.log("got resource");
  console.log(props.spot);
  skillStore.giveSkillExp(props.spot.skillId, 10);
  if (props.spot.products) {
    playerStore.addItemToInventory(props.spot.products[0]);
  }
}
</script>

<style lang="scss" scoped>
.spot-container {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  .spot-header {
    display: flex;
  }
}
.disabled {
  color: grey;
}
</style>
