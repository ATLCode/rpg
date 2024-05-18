import { SkillId } from "~/stores/skill";

export enum DamageType {
  Blunt = "Blunt",
  Slashing = "Slashing",
  Piercing = "Piercing",
}
export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
  Stun = "Stun",
  Poison = "Poison",
}

export type Effect = {
  effectType: EffectType;
  value: number;
  damageType?: DamageType;
};

export type Ability = {
  name: string;
  skillId: SkillId;
  levelReq: number;
  isCombat: boolean;
  isAutomatic: boolean;
  effects?: Effect[];
  itemPropertyReq?: number[];
};

/*
Should we do this with all skills? Like chopping X wood would be ability and so on?
Abilities could have follwing keys:
isAutomatic (You get this ability as you level up)
isCombat (Shows up during combat)
*/

export enum AbilityId {
  FishBluegill = "Fishbluegill",
  BasicBunch = "BasicPunch",
}

export const abilities: Record<AbilityId, Ability> = {
  [AbilityId.FishBluegill]: {
    name: "Fish Bluegill",
    skillId: SkillId.Fishing,
    levelReq: 5,
    isCombat: false,
    isAutomatic: true,
  },
  [AbilityId.BasicBunch]: {
    name: "Basic Punch",
    skillId: SkillId.OneHanded,
    levelReq: 1,
    isCombat: true,
    isAutomatic: true,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 1,
        damageType: DamageType.Blunt,
      },
    ],
  },
};
