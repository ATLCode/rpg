import { defaults } from "~/game/defaults";
import { useNotificationStore, NotificationType } from "@/stores/notification";
import { usePlayerStore } from "@/stores/player";
import { useSpotStore } from "@/stores/spot";
import { useGameStore } from "@/stores/game";
import {
  WorldLocationId,
  worldLocations,
  areaLocations,
} from "~/game/locations";
import { paths, type Path } from "~/game/paths";
import type {
  Camp,
  PlayerLocation,
  WorldLocation,
} from "~/types/location.types";

export const useLocationStore = defineStore("location", () => {
  const playerStore = usePlayerStore();
  const notificationStore = useNotificationStore();
  const gameStore = useGameStore();
  const spotStore = useSpotStore();

  // LOCATIONS & AREAS

  const worldMap = {
    mapImg: "/maps/TestMap.jpg",
  };

  const playerLocation = ref<PlayerLocation>({
    worldLocation: worldLocations[WorldLocationId.Town],
    areaLocation: null,
    subLocation: null,
  });

  const selectedLocation = ref<WorldLocation | null>(null);

  const currentPaths = computed(() => {
    return findPaths();
  });

  const selectedLocationInCurrentPaths = computed(() => {
    if (!selectedLocation.value) {
      return false;
    }
    const reachableLocations: WorldLocationId[] = [];
    currentPaths.value.forEach((path) => {
      path.locations.forEach((location) => {
        reachableLocations.push(location);
      });
    });
    if (reachableLocations.includes(selectedLocation.value.id)) {
      return true;
    }
    return false;
  });

  const playerCoordinates = computed(() => {
    if (playerLocation.value.subLocation) {
      const currentAreaMarker = playerLocation.value.subLocation.coordinates;

      return currentAreaMarker;
    }
    if (playerLocation.value.areaLocation) {
      const currentAreaMarker = playerLocation.value.areaLocation.coordinates;

      return currentAreaMarker;
    } else {
      const currentWorldMarker = playerLocation.value.worldLocation.coordinates;
      return currentWorldMarker;
    }
  });

  const camp = ref<Camp>(defaults.startingCamp);

  // TRAVELING & PATHS

  const targetLocationId = ref<WorldLocationId | null>(null);
  const activePath = ref<Path | null>(null);
  const encountersChecked = ref(0);

  const selectedPath = ref<Path | null>(null);

  function selectPath(locationId: WorldLocationId) {
    console.log(locationId);
    const foundPath = currentPaths.value.find((path) => {
      return Object.values(path.locations).includes(locationId);
    });
    console.log(foundPath);
    if (foundPath) {
      selectedPath.value = foundPath;
    }
  }

  function travelPath() {
    try {
      if (!selectedPath.value) {
        throw new Error("Path not selected");
      }
      const targetLocations = selectedPath.value.locations.filter(
        (endPoint) => endPoint !== playerLocation.value.worldLocation.id
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
  function enterArea() {
    if (playerLocation.value) {
      playerLocation.value.areaLocation =
        areaLocations[playerLocation.value.worldLocation.child];
    } else {
      return console.log("Location doesn't have a child");
    }
  }
  function exitArea() {
    playerLocation.value.areaLocation = null;
    spotStore.$reset();
  }
  function goToLocation(newLocation: PlayerLocation) {
    console.log(newLocation);
    playerLocation.value.worldLocation = newLocation.worldLocation;
    playerLocation.value.areaLocation = newLocation.areaLocation;
    playerLocation.value.subLocation = newLocation.subLocation;
  }
  function findPaths(): Path[] {
    const pathArray: Path[] = [];
    Object.values(paths).forEach((path) => {
      if (path.locations.includes(playerLocation.value.worldLocation.id)) {
        pathArray.push(path);
      }
    });
    console.log("Array" + JSON.stringify(pathArray));
    return pathArray;
  }

  function $reset() {
    playerLocation.value = defaults.startingLocation;
  }

  return {
    playerLocation,
    selectedLocation,
    selectedLocationInCurrentPaths,
    currentPaths,
    playerCoordinates,
    targetLocationId,
    activePath,
    encountersChecked,
    selectedPath,
    selectPath,
    travelPath,
    enterArea,
    exitArea,
    goToLocation,
    camp,
    worldMap,
    $reset,
  };
});
