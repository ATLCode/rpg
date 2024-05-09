import { LocationId } from "./locations";

type Defaults = {
  startingLocationId: LocationId;
};

export const defaults: Defaults = {
  startingLocationId: LocationId.Town,
};
