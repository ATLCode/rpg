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
  HealSelf = "HealSelf",
  PykeUlt = "PykeUlt",
  DashAndSlash = "DashAndSlash",
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
      originRange: 0,
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
      range: 3,
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
  [AbilityId.HealSelf]: {
    id: AbilityId.HealSelf,
    name: "Heal Self",
    img: "/abilities/healself.png",
    cost: AbilityCost.SideAction,
    skillId: null,
    levelReq: 1,
    isAutomatic: true,
    xp: 0,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Heal,
        value: 3,
      },
    ],
    abilityType: AbilityType.Targeted,
    target: {
      range: 3,
      effectRange: 0,
    },
  },
  [AbilityId.PykeUlt]: {
    id: AbilityId.PykeUlt,
    name: "Pyke Ult",
    img: "/abilities/pyke.png",
    cost: AbilityCost.MainAction,
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Damage,
        value: 3,
        damageType: DamageType.Slash,
      },
    ],
    abilityType: AbilityType.Shaped,
    shape: {
      originRange: 4,
      shapes: [
        {
          direction: ShapeDirection.TopRight,
          shapeEffects: [
            {
              coordinates: [
                { x: 1, y: -1 },
                { x: 1, y: 1 },
                { x: -1, y: -1 },
                { x: -1, y: 1 },
                { x: 0, y: 0 },
              ],
            },
          ],
        },
      ],
    },
  },
  [AbilityId.DashAndSlash]: {
    id: AbilityId.DashAndSlash,
    name: "Dash and Slash",
    img: "/abilities/dash-and-slash.png",
    cost: AbilityCost.MainAction,
    skillId: SkillId.Melee,
    levelReq: 1,
    isAutomatic: true,
    xp: 5,
    energyCost: 0,
    effects: [
      {
        effectType: EffectType.Move,
      },
      {
        effectType: EffectType.Damage,
        value: 3,
        damageType: DamageType.Slash,
      },
    ],
    abilityType: AbilityType.Shaped,
    shape: {
      originRange: 0,
      shapes: [
        {
          direction: ShapeDirection.Top,
          shapeEffects: [
            {
              coordinates: [
                { x: 0, y: -1 },
                { x: 0, y: -2 },
              ],
            },
            {
              coordinates: [
                { x: 0, y: -3 },
                { x: -1, y: -3 },
                { x: 1, y: -3 },
              ],
            },
          ],
        },
        {
          direction: ShapeDirection.Right,
          shapeEffects: [
            {
              coordinates: [
                { x: 1, y: 0 },
                { x: 2, y: 0 },
              ],
            },
            {
              coordinates: [
                { x: 3, y: 0 },
                { x: 3, y: 1 },
                { x: 3, y: -1 },
              ],
            },
          ],
        },
        {
          direction: ShapeDirection.Bottom,
          shapeEffects: [
            {
              coordinates: [
                { x: 0, y: 1 },
                { x: 0, y: 2 },
              ],
            },
            {
              coordinates: [
                { x: 0, y: 3 },
                { x: 1, y: 3 },
                { x: -1, y: 3 },
              ],
            },
          ],
        },
        {
          direction: ShapeDirection.Left,
          shapeEffects: [
            {
              coordinates: [
                { x: -1, y: 0 },
                { x: -2, y: 0 },
              ],
            },
            {
              coordinates: [
                { x: -3, y: 0 },
                { x: -3, y: 1 },
                { x: -3, y: -1 },
              ],
            },
          ],
        },
      ],
    },
  },
};
