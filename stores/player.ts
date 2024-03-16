import { defaults } from "~/game/defaults";
import { locations, type Location, LocationType } from "~/game/locations";
import { paths, type Path } from "~/game/paths";
import { type Item } from "~/game/items";

export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const currentLocation = ref<Location>(
    getLocationById(defaults.startingLocationId)
  );

  // Like this or should each slot have id etc?
  type Gear = {
    head: Item | null;
    torso: Item | null;
    legs: Item | null;
    hands: Item | null;
    feet: Item | null;
    mainHand: Item | null;
    offHand: Item | null;
    neck: Item | null;
    fingers: Item | null;
    back: Item | null;
  };

  const gear = ref<Gear>({
    head: null,
    torso: null,
    legs: null,
    hands: null,
    feet: null,
    mainHand: null,
    offHand: null,
    neck: null,
    fingers: null,
    back: null,
  });

  // Iventory as array of either item ids or nulls (or should there be item that's essentially empty?), this way we can handle moving items with gaps in them
  const inventory = ref<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const currentArea = ref<Location>(findArea());
  const currentLocations = ref<Location[]>(findLocations());
  const currentPaths = ref<Path[]>(findPaths());

  function getLocationById(id: number) {
    const result = locations.find((location) => location.id === id);
    if (!result) {
      throw new Error(`Can't find location with id: ${id}`);
    }
    return result;
  }

  function travelPath(path: Path) {
    const targetLocations = path.locations.filter(
      (endPoint) => endPoint !== currentLocation.value.id
    );
    if (targetLocations.length === 1) {
      const targetLocation = getLocationById(targetLocations[0]);
      currentLocation.value = targetLocation;
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
      currentLocation.value = getLocationById(currentLocation.value.child);
      currentArea.value = findArea();
      currentLocations.value = findLocations();
      currentPaths.value = findPaths();
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
      currentLocation.value = getLocationById(currentLocation.value.parent);
      currentArea.value = findArea();
      currentLocations.value = findLocations();
      currentPaths.value = findPaths();
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

  return {
    name,
    currentLocation,
    currentArea,
    currentLocations,
    currentPaths,
    getLocationById,
    travelPath,
    enterArea,
    exitArea,
    goToLocation,
    gear,
    inventory,
  };
});
