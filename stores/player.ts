import { defaults } from "~/game/defaults";
import { locations, type Location } from "~/game/locations";
import { paths, type Path } from "~/game/paths";

export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const currentLocation = ref<Location>(
    getLocationById(defaults.startingLocationId)
  );
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

  function enterLocation() {
    console.log(currentLocation.value);
    if (
      currentLocation.value.type === "container" &&
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
    enterLocation,
  };
});
