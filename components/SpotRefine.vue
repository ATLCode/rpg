<template>
  <div class="crafting-container">
    <div class="actions">
      <div class="list">
        <div class="list-title"><h2>Actions</h2></div>
        <div
          v-for="(action, index) in spotActions"
          :key="index"
          class="list-item"
          :class="{ selected: selectedAction?.id === action.id }"
          @click="selectedAction = action"
        >
          <div>{{ action.name }}</div>
        </div>
      </div>
    </div>
    <div class="img">
      <div v-if="selectedAction">
        {{ selectedAction.name }}
      </div>
      <div v-else>No action selected</div>
    </div>
    <div v-if="selectedAction" class="description">
      <div>
        Description:{{ selectedAction.craftingDetails?.product.item.name }}
      </div>
      <div>Energy Cost:{{ selectedAction.energyCost }}</div>
      <div>XP: {{ selectedAction.xp }}</div>
      <div>
        Ingredients:
        {{ ingredientsString }}
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
          <AButton :disabled="!allowed" @click="startProgress">Craft</AButton>
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
import { useActionStore } from "@/stores/action";
import { useProgress } from "@/composables/progress";
import type { Spot } from "~/types/spot.types";
import type { Action, Ingredient } from "~/types/action.types";

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

const selectedAction = ref<Action | null>(null);

const spotActions = computed(() => {
  if (!props.spot) {
    return null;
  }
  return actionStore.playerActions.filter(
    (action) => action.skillId === props.spot.skillId
  );
});

function startProgress() {
  progress.start();
}

function progressComplete() {
  if (!selectedAction.value) {
    return;
  }
  // Take Energy
  playerStore.useEnergy(selectedAction.value.energyCost);
  // CraftItem - TODO Should this have its own function or do I do here seperatly remove items from inventory, I feel like own function
  itemStore.addItemsToInventory(selectedAction.value.craftingDetails!.product);
  // Get Exp
  if (props.spot.skillId) {
    skillStore.giveSkillExp(props.spot.skillId, selectedAction.value.xp * 3);
  }
}

const ingredientsString = computed(() => {
  if (!selectedAction.value || !selectedAction.value.craftingDetails) {
    return "";
  }

  return selectedAction.value.craftingDetails.ingredients
    .map((ingredient: Ingredient) => {
      const amountInInventory = itemStore.itemCountInInventory(
        ingredient.itemId
      );
      const amount = ` (${ingredient.amount}/${amountInInventory})`;
      return `${ingredient.itemId}${amount}`;
    })
    .join(", ");
});

const allowed = computed(() => {
  // Action selected
  if (!selectedAction.value) {
    return false;
  }
  // Has required ingredients
  for (const element of selectedAction.value.craftingDetails!.ingredients) {
    if (!itemStore.hasEnoughItems(element.itemId, element.amount)) {
      return false;
    }
  }
  // Has room in inventory
  if (
    !itemStore.hasRoomForItems(
      selectedAction.value.craftingDetails!.product.itemId
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
    "actions img"
    "actions description"
    "actions actions";

  padding: 1rem;
}
.actions {
  grid-area: actions;
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
