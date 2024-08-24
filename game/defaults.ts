import { SkillId, abilities, type Ability } from "./abilities";
import { LocationId } from "./locations";
import { npcs, type Npc } from "./npcs";
import type { Time } from "~/types/world.types";

type Defaults = {
  startingTime: Time;
  startingLocationId: LocationId;
  startingAbilities: Ability[];
  startingSkills: Record<SkillId, Skill>;
  startingNpcs: Npc[];
};

export const defaults: Defaults = {
  startingTime: {
    day: 1,
    week: 1,
    season: 1,
    year: 1,
    dayCount: 1,
  },

  startingLocationId: LocationId.Town,
  startingAbilities: Object.values(abilities).filter(
    (ability) => ability.levelReq === 1
  ),
  startingNpcs: Object.values(npcs),
  startingSkills: {
    [SkillId.Fishing]: {
      name: "Fishing",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Woodcutting]: {
      name: "Woodcutting",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Cooking]: {
      name: "Cooking",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },

    [SkillId.Melee]: {
      name: "Melee",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Ranged]: {
      name: "Ranged",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
    [SkillId.Magic]: {
      name: "Magic",
      currentExp: 1,
      currentLevel: 1,
      abilities: [],
    },
  },
};
