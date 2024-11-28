import { usePlayerStore } from "@/stores/player";
import { useSkillStore } from "@/stores/skill";
import { useItemStore } from "@/stores/item";
import { type Pin } from "~/types/location.types";
import {
  CampSpot,
  SpotType,
  type Spot,
  type WeightedAbilityId,
} from "~/types/spot.types";
import type { Ability } from "~/types/ability.types";
import { spots } from "~/game/spots";
import type { AbilityId } from "~/game/abilities";

export const useSpotStore = defineStore("spot", () => {
  const playerStore = usePlayerStore();
  const skillStore = useSkillStore();
  const itemStore = useItemStore();

  const selectedSpot = ref<Spot | null>(null);
  const selectedSpotType = ref<SpotType | null>(null);
  const selectedAbility = ref<Ability | null>(null);
  const availableAbilities = ref<AbilityId[]>([]);
  const availableWeightedAbilities = ref<WeightedAbilityId[]>([]);

  const loading = ref(false);
  const spotModalOpen = ref(false);
  const actionOngoing = ref(false);

  const currentActionProgress = ref(0);
  const currentActionLength = ref(0);
  const actionInterval = ref<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  function selectSpot(selectedPin: Pin) {
    loading.value = true;
    const newSpot = spots[selectedPin.target];
    selectedSpot.value = newSpot;
    if (newSpot.spotType === SpotType.Gather && newSpot.gatherDetails) {
      // Set available abilities
      availableWeightedAbilities.value = newSpot.gatherDetails.abilities.filter(
        (item) => {
          return skillStore.playerAbilityIds.includes(item.object);
        }
      );
      console.log(availableWeightedAbilities.value);
      // Select Random Ability
      selectRandomAbility();
      console.log(selectedAbility.value);
      // Set action length
      currentActionLength.value = newSpot.gatherDetails.interval * 100;
    }
    if (newSpot.spotType === SpotType.Craft && newSpot.crafDetails) {
      // Set available abilities
      availableAbilities.value = newSpot.crafDetails.abilities.filter(
        (item) => {
          return skillStore.playerAbilityIds.includes(item);
        }
      );
      console.log(availableAbilities.value);
      // Selecting ability handled elsewhere
      // Set action length
      currentActionLength.value = newSpot.crafDetails.interval * 100;
    }
    selectedSpotType.value = newSpot.spotType;
    spotModalOpen.value = true;
    loading.value = false;
  }
  function selectCampSpot(campSpot: CampSpot) {
    // Fix later
    console.log(campSpot);
  }
  function selectAbility(ability: Ability) {
    selectedAbility.value = ability;
  }
  function selectRandomAbility() {
    console.log("Selecting random ability");
    const selectedId = chooseRandomWeightedObject(
      availableWeightedAbilities.value
    );
    const chosenAbility = skillStore.playerAbilities.find((element) => {
      return element.id === selectedId;
    });
    if (chosenAbility) {
      selectedAbility.value = chosenAbility;
    }
  }

  function startAction() {
    console.log("Starting Action");
    if (!selectedSpotType.value || !selectedSpot.value) {
      console.log("No action selected");
    }
    actionInterval.value = setInterval(() => {
      progressAction(1);
    }, 10);
    actionOngoing.value = true;
  }

  function progressAction(progressAmount: number) {
    console.log("Progress Action");
    if (playerStore.energy < selectedAbility.value!.energyCost) {
      console.log("Not enough energy to start action");
      stopAction();
    }
    if (currentActionProgress.value >= currentActionLength.value) {
      loopAction();
    }
    currentActionProgress.value = currentActionProgress.value + progressAmount;
  }

  function stopAction() {
    console.log("Stopping Action");
    clearInterval(actionInterval.value);
    actionOngoing.value = false;
    currentActionProgress.value = 0;
    console.log(currentActionProgress.value);
  }

  function loopAction() {
    // Finish Current Action
    playerStore.useEnergy(selectedAbility.value!.energyCost);
    if (selectedSpotType.value === SpotType.Gather) {
      getResource();
    }
    if (selectedSpotType.value === SpotType.Craft) {
      craftItem();
    }
    currentActionProgress.value = 0;
    // Start New Action
    selectRandomAbility();
  }

  function getResource() {
    console.log("Getting resource");
    if (
      !selectedSpot.value?.gatherDetails ||
      !selectedAbility.value?.gatherDetails ||
      !selectedSpot.value.skillId
    ) {
      throw new Error("Can't see selected spot's gatherDetails");
    }

    const chosenItem = selectedAbility.value.gatherDetails.product;
    const xpGain = selectedAbility.value.xp;

    try {
      itemStore.addItemsToInventory(chosenItem);
    } catch (error) {
      console.log("Inventory is full" + error);
      stopAction();
      return;
    }
    skillStore.giveSkillExp(selectedSpot.value.skillId, xpGain);
  }

  function craftItem() {
    console.log("Trying to craft an Item");
  }

  function $reset() {
    currentActionProgress.value = 0;
    currentActionLength.value = 0;
    selectedSpot.value = null;
    loading.value = false;
    actionOngoing.value = false;
    spotModalOpen.value = false;
    actionInterval.value = undefined;
  }
  return {
    currentActionProgress,
    currentActionLength,
    selectedSpot,
    loading,
    actionOngoing,
    spotModalOpen,
    selectSpot,
    selectCampSpot,
    selectAbility,
    selectedAbility,
    startAction,
    stopAction,
    $reset,
  };
});
