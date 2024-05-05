import { defaults } from "~/game/defaults";
import { locations, type Location, LocationType } from "~/game/locations";
import type { SpotResource, SpotCooking, SpotSleeping } from "@/game/spots";
import { resourceSpots } from "@/game/spots";
import { paths, type Path } from "~/game/paths";
import { usePlayerStore, GameState } from "@/stores/player";
export const useLocationStore = defineStore("location", () => {
  const playerStore = usePlayerStore();

  const currentLocation = ref<Location>(
    getLocationById(defaults.startingLocationId)
  );

  const currentArea = ref<Location>(findArea());
  const currentLocations = ref<Location[]>(findLocations());
  const currentPaths = ref<Path[]>(findPaths());
  const selectedLocation = ref<Location>(currentLocation.value);

  function changeSelectedLocation(locationId: number) {
    selectedLocation.value = getLocationById(locationId);
  }

  const playerCoordinates = computed(() => {
    const currentMarker = currentArea.value.mapMarkers?.find(
      (marker) => marker.locationId === currentLocation.value.id
    );
    return { x: currentMarker!.x, y: currentMarker!.y };
  });

  type Camp = {
    resourceSpots: SpotResource[];
    cookingSpots: SpotCooking[];
    sleepingSpots: SpotSleeping[];
  };

  const camp = ref<Camp>({
    resourceSpots: [],
    cookingSpots: [],
    sleepingSpots: [],
  });

  // Verkku, should this be computed or just make function of this?

  const currentResourceSpots = computed(() => {
    if (currentLocation.value.resourceSpots?.length === 0) {
      return;
    }
    const spots: SpotResource[] = [];

    currentLocation.value.resourceSpots?.forEach((spotId) => {
      const spot = resourceSpots.find((rSpot) => rSpot.id === spotId);
      if (!spot) {
        return;
      }
      spots.push(spot);
    });
    return spots;
  });

  function getLocationById(id: number) {
    const result = locations.find((location) => location.id === id);
    if (!result) {
      throw new Error(`Can't find location with id: ${id}`);
    }
    return result;
  }

  // TRAVELING & PATHS

  const targetLocation = ref<Location | null>(null);
  const activePath = ref<Path | null>(null);

  const selectedPath = ref<Path | null>(null);
  function selectPath(locationId: number) {
    console.log("Selecting path for");
    console.log(locationId);
    const foundPath = currentPaths.value.find((path) => {
      return path.locations.includes(locationId);
    });
    if (foundPath) {
      selectedPath.value = foundPath;
    }
  }

  function travelPath(path: Path) {
    const targetLocations = path.locations.filter(
      (endPoint) => endPoint !== currentLocation.value.id
    );
    if (targetLocations.length === 1) {
      const pathTargetLocation = getLocationById(targetLocations[0]);
      // How To travel here
      targetLocation.value = pathTargetLocation;
      activePath.value = path;
      playerStore.gameState = GameState.Travel;
    } else {
      console.log("Something went wrong");
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
    console.log(currentLocation.value);
    if (
      currentLocation.value.type === LocationType.Exit &&
      currentLocation.value.parent
    ) {
      goToLocation(currentLocation.value.parent);
    } else {
      return console.log("Can't enter into a location that is not container");
    }
  }

  function goToLocation(locationId: number) {
    currentLocation.value = getLocationById(locationId);
    currentArea.value = findArea();
    currentLocations.value = findLocations();
    currentPaths.value = findPaths();
  }

  function findArea() {
    console.log(currentLocation.value);
    return getLocationById(currentLocation.value.parent);
  }

  function findLocations() {
    if (currentLocation.value.parent === 9001) {
      return [];
    }
    return locations.filter(
      (location) => location.parent === currentLocation.value.parent
    );
  }

  function findPaths(): Path[] {
    const pathArray: Path[] = [];
    paths.forEach((path) => {
      if (path.locations.includes(currentLocation.value.id)) {
        pathArray.push(path);
      }
    });
    return pathArray;
  }

  function $reset() {
    currentLocation.value = getLocationById(defaults.startingLocationId);
    camp.value = {
      resourceSpots: [],
      cookingSpots: [],
      sleepingSpots: [],
    };
  }

  return {
    currentLocation,
    currentArea,
    currentLocations,
    currentPaths,
    currentResourceSpots,
    selectedLocation,
    playerCoordinates,
    changeSelectedLocation,
    getLocationById,
    targetLocation,
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
