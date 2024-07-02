import { abilities, type Ability } from "./abilities";
import { LocationId } from "./locations";
import { npcs, type Npc } from "./npcs";

type Defaults = {
  startingDay: number;
  startingLocationId: LocationId;
  startingAbilities: Ability[];
  startingNpcs: Npc[];
};

export const defaults: Defaults = {
  startingDay: 1,
  startingLocationId: LocationId.Town,
  startingAbilities: Object.values(abilities).filter(
    (ability) => ability.levelReq === 1
  ),
  startingNpcs: Object.values(npcs),
};
