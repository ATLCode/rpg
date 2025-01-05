<template>
  <div class="gather-container">
    <div class="gather-header">
      <ASpacer />
      <div>{{ props.spot.name }}</div>
      <ASpacer />
      <AButton variant="plain" padding="0rem" @click="$emit('close')"
        >X</AButton
      >
    </div>
    <div class="gather-content">
      <div class="spot-img">
        <ASpacer />
        <img :src="props.spot.img" alt="image" />
        <ASpacer />
      </div>
      <div class="center">
        <div class="progress-buttons">
          <AProgressLinear
            v-model="progress.currentProgress.value"
            :max="progress.progressLength.value"
            height="2.5rem"
            width="100%"
          />
          <AButton v-if="!progress.active.value" @click="startProgress"
            >START</AButton
          >
          <AButton v-else background-color="--error" @click="progress.stop"
            >STOP</AButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSpotStore } from "@/stores/spot";
import { useSkillStore } from "@/stores/skill";
import { usePlayerStore } from "@/stores/player";
import { useItemStore } from "@/stores/item";
import { useActionStore } from "@/stores/action";
import { useProgress } from "@/composables/progress";
import type { Spot } from "~/types/spot.types";
import type { Action } from "~/types/action.types";
import { defaults } from "~/game/defaults";

const spotStore = useSpotStore();
const skillStore = useSkillStore();
const playerStore = usePlayerStore();
const itemStore = useItemStore();
const actionStore = useActionStore();

const props = defineProps({
  spot: {
    type: Object as PropType<Spot>,
    required: true,
  },
});

defineEmits(["close"]);

const availableActionIds = computed(() => {
  const sharedActionIds = props.spot.gatherDetails!.actions.filter(
    (weightedAction) => {
      return actionStore.playerActionIds.includes(weightedAction.object);
    }
  );
  console.log(sharedActionIds);
  return sharedActionIds;
});

const selectedAction = ref<Action | null>(null);

function startProgress() {
  selectedAction.value = spotStore.selectRandomAbility(
    availableActionIds.value
  );
  console.log(selectedAction.value);
  progress.start();
}

function progressComplete() {
  if (!selectedAction.value) {
    return;
  }
  // Take Energy
  playerStore.useEnergy(selectedAction.value.energyCost);
  // Get Resource
  itemStore.addItemsToInventory(selectedAction.value.gatherDetails!.product);
  // Get Exp
  if (props.spot.skillId) {
    skillStore.giveSkillExp(props.spot.skillId, selectedAction.value.xp);
  }
  // Select Random Ability
  selectedAction.value = spotStore.selectRandomAbility(
    availableActionIds.value
  );
}

const allowed = computed(() => {
  if (!selectedAction.value || !selectedAction.value.gatherDetails) {
    return false;
  }
  // Free Inventory slots
  if (
    !itemStore.hasRoomForItems(
      selectedAction.value.gatherDetails.product.itemId
    )
  ) {
    return false;
  }
  if (playerStore.energy < selectedAction.value.energyCost) {
    // Enough energy?
    return false;
  }
  return true;
});

const progress = useProgress(
  allowed,
  props.spot.gatherDetails!.interval * 100,
  progressComplete
);
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
