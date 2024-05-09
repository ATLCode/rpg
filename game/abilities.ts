import { SkillId } from "~/stores/skill";

export type Ability = {
  name: string;
  effects?: number[];
  skillId: SkillId;
  levelReq: number;
};

/*
Should we do this with all skills? Like chopping X wood would be ability and so on?
Abilities could have follwing keys:
isAutomatic (You get this ability as you level up)
isCombat (Shows up during combat)
*/

export enum AbilityId {
  FishBluegill,
}

export const abilities: Record<AbilityId, Ability> = {
  [AbilityId.FishBluegill]: {
    name: "Fish Bluegill",
    skillId: SkillId.Fishing,
    levelReq: 5,
  },
};
