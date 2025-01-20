import { SkillId } from "~/types/skill.types";
import {
  AbilityCost,
  AbilityType,
  DamageType,
  EffectType,
  ShapeDirection,
  type Ability,
} from "~/types/ability.types";

export enum AbilityId {
  BasicPunch = "BasicPunch",
  BasicKick = "BasicKick",
  Move = "Move",
  Bullseye = "Bullseye",
}

export const abilities: Record<AbilityId, Ability> = {
  [AbilityId.BasicPunch]: {
    id: AbilityId.BasicPunch,
    name: "Basic Punch",
    img: "/abilities/punch.png",
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 1,
        damageType: DamageType.Blunt,
      },
    ],
    cost: AbilityCost.MainAction,
    abilityType: AbilityType.Shaped,
    shape: {
      originRange: 0,
      shapes: [
        {
          direction: ShapeDirection.Top,
          shapeEffects: [{ coordinates: [{ x: 0, y: -1 }] }],
        },
        {
          direction: ShapeDirection.Right,
          shapeEffects: [{ coordinates: [{ x: 1, y: 0 }] }],
        },
        {
          direction: ShapeDirection.Bottom,
          shapeEffects: [{ coordinates: [{ x: 0, y: 1 }] }],
        },
        {
          direction: ShapeDirection.Left,
          shapeEffects: [{ coordinates: [{ x: -1, y: 0 }] }],
        },
      ],
    },
  },
  [AbilityId.BasicKick]: {
    id: AbilityId.BasicKick,
    name: "Basic Kick",
    img: "/abilities/kick.png",
    cost: AbilityCost.MainAction,
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 2,
        damageType: DamageType.Blunt,
      },
    ],
    abilityType: AbilityType.Shaped,
    shape: {
      originRange: 1,
      shapes: [
        {
          direction: ShapeDirection.TopRight,
          shapeEffects: [{ coordinates: [{ x: 1, y: -1 }] }],
        },
        {
          direction: ShapeDirection.TopLeft,
          shapeEffects: [{ coordinates: [{ x: -1, y: -1 }] }],
        },
        {
          direction: ShapeDirection.BottomRight,
          shapeEffects: [{ coordinates: [{ x: 1, y: 1 }] }],
        },
        {
          direction: ShapeDirection.BottomLeft,
          shapeEffects: [{ coordinates: [{ x: -1, y: 1 }] }],
        },
      ],
    },
  },
  [AbilityId.Move]: {
    id: AbilityId.Move,
    name: "Move",
    img: "/abilities/move.png",
    cost: AbilityCost.SideAction,
    skillId: null,
    levelReq: 1,
    isAutomatic: true,
    xp: 0,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Move,
      },
    ],
    abilityType: AbilityType.Targeted,
    target: {
      range: 2,
      effectRange: 0,
    },
  },
  [AbilityId.Bullseye]: {
    id: AbilityId.Bullseye,
    name: "Bullseye",
    img: "/abilities/bullseye.png",
    cost: AbilityCost.MainAction,
    skillId: null,
    levelReq: 1,
    isAutomatic: true,
    xp: 0,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 3,
        damageType: DamageType.Pierce,
      },
    ],
    abilityType: AbilityType.Targeted,
    target: {
      range: 3,
      effectRange: 0,
    },
  },
};
