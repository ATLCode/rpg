<template>
  <div class="spot-container">
    <div class="spot-header">
      <div>
        <h4>{{ spot.name }}</h4>
      </div>
    </div>
    <div>{{ skillStore.skills[spot.skillId].name }}</div>
    <div class="spot-img">
      <img :src="spot.img" alt="image" />
    </div>
    <div v-if="fuel">
      <div>Selected Fuel:</div>
      <div>No fuel selected</div>
    </div>
    <AButton v-if="fuel">Change Fuel</AButton>
    <ADivider v-if="fuel" />
    <div class="spot-ingredients">
      <div>Ingredients:</div>
      <div v-if="selectedRecipe">
        <div v-for="ingredient in selectedRecipe.ingredients" :key="ingredient">
          {{ items[ingredient].name }} ({{ ingredientsInInventory }})
        </div>
      </div>
      <div v-if="!selectedRecipe">No recipe selected</div>
    </div>
    <ADivider />
    <div class="spot-recipe">
      <div>Selected Recipe:</div>
      <div v-if="selectedRecipe">
        {{ selectedRecipe.product?.item.name }} ({{ productsInInventory }})
      </div>
      <div v-if="!selectedRecipe">No recipe selected</div>
    </div>
    <AButton @click="showRecipes = true">Change Recipe</AButton>
    <AButton
      v-if="currentActionSpotId !== props.spotId"
      :disabled="isDisabled"
      @click="startAction"
      >Start Cooking</AButton
    >
    <AButton
      v-if="currentActionSpotId === props.spotId"
      background-color="--error"
      @click="stopAction"
      >Stop Cooking</AButton
    >

    <AProgressLinear v-model="progress" :max="totalSeconds" />
  </div>
  <AModal v-model="showRecipes">
    <div
      v-for="ability in spotAbilities"
      :key="ability.name"
      class="recipe"
      @click="selectRecipe(ability)"
    >
      {{ ability.product?.item.name }}
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { abilities } from "@/game/abilities";
import { useNotificationStore, NotificationType } from "@/stores/notification";
import { items } from "@/game/items";
import { useSkillStore } from "@/stores/skill";
import { usePlayerStore } from "@/stores/player";
import { useItemStore } from "@/stores/item";
import type { Ability } from "~/types/ability.types";
import { spots, type SpotId } from "~/game/spots";

const skillStore = useSkillStore();
const playerStore = usePlayerStore();
const notificationStore = useNotificationStore();
const itemStore = useItemStore();

const props = defineProps({
  spotId: {
    type: String as PropType<SpotId>,
    required: true,
  },
  currentActionSpotId: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(["newCurrentAction"]);

const spot = computed(() => {
  return spots[props.spotId];
});

const spotAbilities = computed(() => {
  const spotSkill = spot.value.skillId;
  return Object.fromEntries(
    Object.entries(abilities).filter(
      ([_key, value]) => value.skillId === spotSkill
    )
  );
});

const ingredientsInInventory = computed(() => {
  if (selectedRecipe.value?.ingredients) {
    return playerStore.itemCountInInventory(
      selectedRecipe.value?.ingredients[0]
    );
  }
  return 0;
});
const productsInInventory = computed(() => {
  if (selectedRecipe.value?.product) {
    return playerStore.itemCountInInventory(
      selectedRecipe.value?.product.itemId
    );
  }
  return 0;
});

// Actually is selected ability, but we show the product
const selectedRecipe = ref<Ability | null>(null);
// Ignore fuel for now, we'll see if we even use it at all
const fuel = ref(false);

const showRecipes = ref(false);

const progress = ref(0);
const totalSeconds = ref(spot.value.interval);
const isDisabled = computed(() => {
  if (
    props.currentActionSpotId !== undefined &&
    props.currentActionSpotId !== props.spotId
  ) {
    return true;
  }
  if (!selectedRecipe.value) {
    return true;
  }
  if (ingredientsInInventory.value < 1) {
    return true;
  }

  return false;
});

function selectRecipe(ability: Ability) {
  selectedRecipe.value = ability;
  showRecipes.value = false;
}

function startAction() {
  console.log("Starting action");
  if (isDisabled.value) {
    return;
  }

  emit("newCurrentAction", props.spotId);
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

const actionInterval = ref<ReturnType<typeof setTimeout> | undefined>(
  undefined
);
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
  try {
    if (finishedInterval.value === true) {
      playerStore.useEnergy(spot.value.energy);
      takeIngredients();
      getProduct();
      giveExperience();
      progress.value = 0;
      if (isDisabled.value) {
        stopAction();
      }
    }
  } catch (error) {
    let message = "Unknown Error";

    if (error instanceof Error) message = error.message;

    notificationStore.showNotification(
      NotificationType.Game,
      message,
      false,
      1000
    );

    stopAction();

    console.log(message);
  }
});

function takeIngredients() {
  console.log("Take Ingredient");
  selectedRecipe.value?.ingredients?.forEach((itemId) => {
    playerStore.removeItemsFromInventoryById(itemId);
  });
}

function getProduct() {
  console.log("Getting resource");
  if (selectedRecipe.value?.product) {
    playerStore.addItemsToInventory(selectedRecipe.value?.product);
  }
}

function giveExperience() {
  console.log("Gaining experience");
  const skill = spot.value.skillId;
  const amount = selectedRecipe.value?.xp;

  if (amount) {
    skillStore.giveSkillExp(skill, amount);
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
  gap: 0.5rem;
  .spot-header {
    display: flex;
  }
}
.disabled {
  color: grey;
}
.spot-img {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}
img {
  max-height: 100px;
  max-width: 100px;
}
.recipe {
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--elevation1);
  }
}
</style>
