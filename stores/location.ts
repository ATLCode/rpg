import { defaults } from "~/game/defaults";
import { useNotificationStore, NotificationType } from "@/stores/notification";
import { usePlayerStore } from "@/stores/player";
import { useGameStore } from "@/stores/game";
import { PinId, pins } from "~/game/locations";
import { paths, type Path } from "~/game/paths";
import type { Camp, Location, Pin } from "~/types/location.types";

export const useLocationStore = defineStore("location", () => {
  const playerStore = usePlayerStore();
  const notificationStore = useNotificationStore();
  const gameStore = useGameStore();

  // LOCATIONS & PINS

  const playerLocation = ref<Location>(defaults.startingLocation); // Why defaults.startingLocation doesn't work?
  const campReturnLocation = ref<Location | null>(null);

  const selectedPin = ref<Pin | null>(pins[playerLocation.value.pinId]);
  function selectPin(pin: Pin) {
    selectedPin.value = pin;
  }

  const camp = ref<Camp>(defaults.startingCamp);

  // TRAVELING & PATHS

  const targetLocationId = ref<PinId | null>(null);
  const activePath = ref<Path | null>(null);
  const encountersChecked = ref(0);

  const selectedPath = computed(() => {
    const currentPin = selectedPin.value;
    if (!currentPin || currentPin.id === playerLocation.value.pinId) {
      return null;
    } else {
      const foundPath = currentPaths.value.find((path) => {
        return Object.values(path.locations).includes(currentPin.id);
      });
      return foundPath;
    }
  });

  const currentPaths = computed(() => {
    const pathArray: Path[] = [];
    Object.values(paths).forEach((path) => {
      if (path.locations.includes(playerLocation.value.pinId)) {
        pathArray.push(path);
      }
    });
    console.log("Array" + JSON.stringify(pathArray));
    return pathArray;
  });

  function travelPath() {
    try {
      if (!selectedPath.value) {
        throw new Error("Path not selected");
      }
      const targetLocations = selectedPath.value.locations.filter(
        (endPoint) => endPoint !== playerLocation.value.pinId
      );

      if (targetLocations.length === 1) {
        playerStore.useEnergy(selectedPath.value.energyCost);
        targetLocationId.value = targetLocations[0];
        activePath.value = selectedPath.value;
        gameStore.gameState = GameState.Travel;
      } else {
        console.log("Something went wrong");
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

      console.log(message);
    }
  }
  function goToLocation(newLocation: Location) {
    playerLocation.value = newLocation;
  }

  function $reset() {
    playerLocation.value = defaults.startingLocation;
  }

  return {
    playerLocation,
    campReturnLocation,
    currentPaths,
    targetLocationId,
    activePath,
    encountersChecked,
    selectedPath,
    travelPath,
    goToLocation,
    camp,
    selectPin,
    selectedPin,
    $reset,
  };
});
