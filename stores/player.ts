import { defaults } from "~/game/defaults";
import { locations, type Location } from "~/game/locations";
import { paths, type Path } from "~/game/paths";

export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const currentLocation = ref<Location>(
    getLocationById(defaults.startingLocationId)
  );

  function getLocationById(id: number) {
    const result = locations.find((location) => location.id === id);
    if (!result) {
      throw new Error(`Can't find location with id: ${id}`);
    }
    return result;
  }

  function showArea() {
    return getLocationById(currentLocation.value.parent);
  }

  function showLocations() {
    if (currentLocation.value.parent === 9001) {
      return [];
    }
    return locations.filter(
      (location) => location.parent === currentLocation.value.parent
    );
  }

  function showPaths(): Path[] {
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
    getLocationById,
    showArea,
    showLocations,
    showPaths,
  };
});
