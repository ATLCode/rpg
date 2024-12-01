<template>
  <div class="crafting-container">
    <div class="abilities">
      <div class="list">
        <div class="list-title"><h2>Abilities</h2></div>
        <div
          v-for="(ability, index) in spotAbilities"
          :key="index"
          class="list-item"
          :class="{ selected: selectedAbility?.id === ability.id }"
          @click="selectedAbility = ability"
        >
          <div>{{ ability.name }}</div>
        </div>
      </div>
    </div>
    <div class="img">
      <div v-if="selectedAbility">
        {{ selectedAbility.name }}
      </div>
      <div v-else>No ability selected</div>
    </div>
    <div v-if="selectedAbility" class="description">
      <div>
        Description:{{ selectedAbility.craftingDetails?.product.item.name }}
      </div>
      <div>Energy Cost:{{ selectedAbility.energyCost }}</div>
      <div>XP: {{ selectedAbility.xp }}</div>
      <div>
        Ingredients:
        {{ selectedAbility.craftingDetails?.ingredients }}
      </div>
    </div>
    <div class="actions">
      <div class="buttons">
        <AButton
          v-if="progress.active.value"
          background-color="--error"
          @click="progress.stop()"
          >Stop</AButton
        >
        <div v-else class="craft">
          <AButton :disabled="!allowed" @click="startProgress"
            >Craft {{ disableReason ? `(${disableReason})` : "" }}</AButton
          >
        </div>
      </div>

      <AProgressLinear
        v-model="progress.currentProgress.value"
        :max="progress.progressLength.value"
        height="2.5rem"
        width="100%"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSkillStore } from "@/stores/skill";
import { usePlayerStore } from "@/stores/player";
import { useItemStore } from "@/stores/item";
import { useProgress } from "@/composables/progress";
import type { Ability } from "~/types/ability.types";
import type { Spot } from "~/types/spot.types";

const skillStore = useSkillStore();
const playerStore = usePlayerStore();
const itemStore = useItemStore();

const props = defineProps({
  spot: {
    type: Object as PropType<Spot>,
    required: true,
  },
});

const selectedAbility = ref<Ability | null>(null);

const spotAbilities = computed(() => {
  if (!props.spot) {
    return null;
  }
  return skillStore.playerAbilities.filter(
    (ability) => ability.skillId === props.spot.skillId
  );
});

function startProgress() {
  progress.start();
}

function progressComplete() {
  if (!selectedAbility.value) {
    return;
  }
  // Take Energy
  playerStore.useEnergy(selectedAbility.value.energyCost);
  // CraftItem
  itemStore.addItemsToInventory(selectedAbility.value.craftingDetails!.product);
  // Get Exp
  if (props.spot.skillId) {
    skillStore.giveSkillExp(props.spot.skillId, selectedAbility.value.xp * 3);
  }
}

const disableReason = computed(() => {
  if (!selectedAbility.value) {
    return "No ability selected";
  }
  return null;
});

const allowed = computed(() => {
  // Ability selected
  if (!selectedAbility.value) {
    return false;
  }
  // Has required ingredients
  // Free Inventory slots?
  // Enough energy?
  if (playerStore.energy < selectedAbility.value.energyCost) {
    return false;
  }

  return true;
});

const progress = useProgress(
  allowed,
  props.spot.crafDetails!.interval * 100,
  progressComplete
);
</script>

<style lang="scss" scoped>
.crafting-container {
  height: calc(100% - 59px);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3fr 2fr auto;
  grid-template-areas:
    "abilities img"
    "abilities description"
    "abilities actions";

  padding: 1rem;
}
.abilities {
  grid-area: abilities;
}
.img {
  grid-area: img;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--elevation2);
}
.description {
  grid-area: description;
}
.actions {
  grid-area: actions;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .list-title {
    display: flex;
    justify-content: center;
  }
  .list-item {
    min-height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
  }
  .list-item:hover {
    background-color: var(--elevation2);
  }
  .selected {
    background-color: var(--elevation2);
  }
}

.buttons {
  display: flex;
  flex-direction: column;
}
.craft {
  display: flex;
  flex-direction: column;
}
</style>
