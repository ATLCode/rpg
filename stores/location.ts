import { defaults } from "~/game/defaults";
import { useNotificationStore, NotificationType } from "@/stores/notification";
import {
  locations,
  type Location,
  LocationType,
  LocationId,
} from "~/game/locations";
import type { SpotResource, SpotRefining, SpotSleeping } from "@/game/spots";
import { resourceSpots } from "@/game/spots";
import { paths, type Path } from "~/game/paths";
import { usePlayerStore, GameState } from "@/stores/player";

export const useLocationStore = defineStore("location", () => {
  const playerStore = usePlayerStore();
  const notificationStore = useNotificationStore();

  const currentLocationId = ref<LocationId>(defaults.startingLocationId);

  const currentLocation = computed(() => {
    return locations[currentLocationId.value];
  });

  const currentAreaId = computed(() => {
    return currentLocation.value.parent;
  });
  const currentArea = computed(() => {
    return locations[currentAreaId.value];
  });

  const currentLocations = ref<Record<LocationId, Location>>(findLocations());
  const currentPaths = ref<Path[]>(findPaths());

  const selectedLocationId = ref<LocationId>(currentLocationId.value);
  const selectedLocation = computed(() => {
    return locations[selectedLocationId.value];
  });

  function changeSelectedLocation(locationId: LocationId) {
    selectedLocationId.value = locationId;
  }

  const playerCoordinates = computed(() => {
    const currentMarker = currentArea.value.mapMarkers?.find(
      (marker) => marker.locationId === currentLocationId.value
    );
    return { x: currentMarker!.x, y: currentMarker!.y };
  });

  type Camp = {
    resourceSpots: SpotResource[];
    refiningSpots: SpotRefining[];
    sleepingSpots: SpotSleeping[];
  };

  const camp = ref<Camp>({
    resourceSpots: [],
    refiningSpots: [],
    sleepingSpots: [],
  });

  const currentResourceSpots = computed(() => {
    if (currentLocation.value.resourceSpots?.length === 0) {
      return;
    }
    const spots: SpotResource[] = [];

    currentLocation.value.resourceSpots?.forEach((spotId) => {
      const spot = resourceSpots[spotId];
      if (!spot) {
        return;
      }
      spots.push(spot);
    });
    return spots;
  });

  // TRAVELING & PATHS

  const targetLocationId = ref<LocationId | null>(null);
  const activePath = ref<Path | null>(null);

  const selectedPath = ref<Path | null>(null);
  function selectPath(locationId: number) {
    const foundPath = currentPaths.value.find((path) => {
      return Object.values(path.locations).includes(locationId);
    });
    if (foundPath) {
      selectedPath.value = foundPath;
    }
  }

  function travelPath(path: Path | null) {
    try {
      if (!path) {
        throw new Error("Path not selected");
      }
      const targetLocations = path.locations.filter(
        (endPoint) => endPoint !== currentLocationId.value
      );

      if (targetLocations.length === 1) {
        playerStore.useEnergy(path.energy);
        targetLocationId.value = targetLocations[0];
        activePath.value = path;
        playerStore.gameState = GameState.Travel;
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
    console.log(currentLocation.value);
    if (
      currentLocation.value.type === LocationType.Container &&
      currentLocation.value.child
    ) {
      goToLocation(currentLocation.value.child);
    } else {
      return console.log("Can't enter into a location that is not container");
    }
  }
  function exitArea() {
    console.log(selectedLocation.value);
    if (
      selectedLocation.value.type === LocationType.Exit &&
      selectedLocation.value.parent
    ) {
      goToLocation(selectedLocation.value.parent);
    } else {
      return console.log(
        "Can't enter into a location that is not container - exit"
      );
    }
  }

  function goToLocation(locationId: LocationId) {
    currentLocationId.value = locationId;
    currentLocations.value = findLocations();
    currentPaths.value = findPaths();
  }

  function findLocations(): Record<LocationId, Location> {
    if (currentLocation.value.parent === LocationId.None) {
      return {} as Record<LocationId, Location>;
    }
    return Object.fromEntries(
      Object.entries(locations).filter(
        ([_key, value]) => value.parent === currentLocation.value.parent
      )
    ) as Record<LocationId, Location>;
  }

  function findPaths(): Path[] {
    const pathArray: Path[] = [];
    Object.values(paths).forEach((path) => {
      if (path.locations.includes(currentLocationId.value)) {
        pathArray.push(path);
      }
    });
    return pathArray;
  }

  function $reset() {
    currentLocationId.value = defaults.startingLocationId;
    camp.value = {
      resourceSpots: [],
      refiningSpots: [],
      sleepingSpots: [],
    };
  }

  return {
    currentLocationId,
    currentLocation,
    currentAreaId,
    currentArea,
    currentLocations,
    currentPaths,
    currentResourceSpots,
    selectedLocationId,
    selectedLocation,
    playerCoordinates,
    changeSelectedLocation,
    targetLocationId,
    activePath,
    selectedPath,
    selectPath,
    travelPath,
    enterArea,
    exitArea,
    goToLocation,
    camp,
    $reset,
  };
});
