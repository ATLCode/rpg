import { SkillId } from "~/types/skill.types";
import { DamageType, EffectType } from "./effects";
import {
  AbilityType,
  CombatActionType,
  type Ability,
} from "~/types/ability.types";

export enum AbilityId {
  BasicPunch = "BasicPunch",
  BasicKick = "BasicKick",
  Move = "Move",
}

export const abilities: Record<AbilityId, Ability> = {
  [AbilityId.BasicPunch]: {
    id: AbilityId.BasicPunch,
    abilityType: AbilityType.Combat,
    name: "Basic Punch",
    img: "asd",
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    combatDetails: {
      effects: [
        {
          effectType: EffectType.Damage,
          value: 1,
          damageType: DamageType.Blunt,
        },
      ],
      actionType: CombatActionType.MainAction,
    },
  },
  [AbilityId.BasicKick]: {
    id: AbilityId.BasicKick,
    abilityType: AbilityType.Combat,
    name: "Basic Kick",
    img: "asd",
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    combatDetails: {
      effects: [
        {
          effectType: EffectType.Damage,
          value: 2,
          damageType: DamageType.Blunt,
        },
      ],
      actionType: CombatActionType.MainAction,
    },
  },
  [AbilityId.Move]: {
    id: AbilityId.Move,
    abilityType: AbilityType.Combat,
    name: "Move",
    img: "/public/icons/circle.png",
    skillId: null,
    levelReq: 1,
    isAutomatic: true,
    xp: 0,
    energyCost: 0,
    combatDetails: {
      effects: [
        {
          effectType: EffectType.Damage,
          value: 2,
          damageType: DamageType.Blunt,
        },
      ],
      actionType: CombatActionType.SideAction,
    },
  },
};
