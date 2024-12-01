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
import { useProgress } from "@/composables/progress";
import type { Spot } from "~/types/spot.types";
import type { Ability } from "~/types/ability.types";

const spotStore = useSpotStore();
const skillStore = useSkillStore();
const playerStore = usePlayerStore();
const itemStore = useItemStore();

const props = defineProps({
  spot: {
    type: Object as PropType<Spot>,
    required: true,
  },
});

defineEmits(["close"]);

const availableAbilityIds = computed(() => {
  const sharedAbilityIds = props.spot.gatherDetails!.abilities.filter(
    (weightedAbility) => {
      return skillStore.playerAbilityIds.includes(weightedAbility.object);
    }
  );
  return sharedAbilityIds;
});

const selectedAbility = ref<Ability | null>(null);

function startProgress() {
  selectedAbility.value = spotStore.selectRandomAbility(
    availableAbilityIds.value
  );

  progress.start();
}

function progressComplete() {
  if (!selectedAbility.value) {
    return;
  }
  // Take Energy
  playerStore.useEnergy(selectedAbility.value.energyCost);
  // Get Resource
  itemStore.addItemsToInventory(selectedAbility.value.gatherDetails!.product);
  // Get Exp
  if (props.spot.skillId) {
    skillStore.giveSkillExp(props.spot.skillId, selectedAbility.value.xp * 5);
  }
  // Select Random Ability
  selectedAbility.value = spotStore.selectRandomAbility(
    availableAbilityIds.value
  );
}

const allowed = computed(() => {
  // Free Inventory slots?
  // Enough energy?
  if (
    !selectedAbility.value ||
    playerStore.energy < selectedAbility.value.energyCost
  ) {
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
