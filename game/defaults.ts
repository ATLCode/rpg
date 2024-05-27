import { abilities, type Ability } from "./abilities";
import { LocationId } from "./locations";

type Defaults = {
  startingLocationId: LocationId;
  startingAbilities: Ability[];
};

export const defaults: Defaults = {
  startingLocationId: LocationId.Town,
  startingAbilities: Object.values(abilities).filter(
    (ability) => ability.levelReq === 1
  ),
};
