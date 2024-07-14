import { SkillId, abilities, type Ability } from "./abilities";
import { LocationId } from "./locations";
import { npcs, type Npc } from "./npcs";

type Defaults = {
  startingDay: number;
  startingLocationId: LocationId;
  startingAbilities: Ability[];
  startingSkills: Record<SkillId, Skill>;
  startingNpcs: Npc[];
};

export const defaults: Defaults = {
  startingDay: 1,
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
