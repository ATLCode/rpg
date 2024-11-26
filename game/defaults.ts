import { abilities } from "./abilities";
import { itemContainers } from "./items";
import { npcs, type Npc } from "./npcs";
import { shops, type Shop } from "./shops";
import { SpotId } from "./spots";
import { MapId, PinId } from "./locations";
import { PinType, type Camp, type Location } from "~/types/location.types";
import type { Time } from "~/types/world.types";
import { SkillId, type Ability } from "~/types/ability.types";
import { type ItemContainer } from "~/types/item.types";
type Defaults = {
  startingTime: Time;
  startingLocation: Location;
  startingAbilities: Ability[];
  startingSkills: Record<SkillId, Skill>;
  startingNpcs: Npc[];
  startingShops: Shop[];
  startingCamp: Camp;
  // startingItemContainers: Record<ItemContainerId, ItemContainer>;
  startingItemContainers: ItemContainer[];
};

export const defaults: Defaults = {
  startingTime: {
    minutes: 0,
    hours: 8,
    day: 1,
    week: 1,
    season: 1,
    year: 1,
    dayCount: 1,
  },

  startingLocation: {
    mapId: MapId.World,
    pinId: PinId.Town,
  },

  startingNpcs: Object.values(npcs),
  startingShops: Object.values(shops),
  startingCamp: [
    {
      name: "Camp Edge",
      type: PinType.Access,
      target: null,
      icon: "/icons/pin_exit.png",
      coordinates: { x: 1000, y: 1000 },
      isVisible: true,
    },
    {
      name: "Sleeping Spot",
      type: PinType.Spot,
      target: SpotId.Bedroll,
      icon: "/icons/spot_sleeping.png",
      coordinates: { x: 1350, y: 1850 },
      isVisible: true,
    },
    {
      name: "Cooking Spot",
      type: PinType.Spot,
      target: SpotId.Campfire,
      icon: "/icons/spot_cooking.png",
      coordinates: { x: 2000, y: 1300 },
      isVisible: true,
    },
  ],
  startingCamp2: {
    sleepingSpot: {
      name: "Sleeping Spot",
      coordinates: { x: 1350, y: 1850 },
      spotId: SpotId.Bedroll,
    },
    cookingSpot: {
      name: "Cooking Spot",
      coordinates: { x: 2000, y: 1300 },
      spotId: SpotId.Campfire,
    },
    storageSpot: {
      name: "Storage",
      coordinates: { x: 1000, y: 1800 },
    },
  },
  startingSkills: {
    [SkillId.Fishing]: {
      name: "Fishing",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_fishing.png",
    },
    [SkillId.Woodcutting]: {
      name: "Woodcutting",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_woodcutting.png",
    },
    [SkillId.Mining]: {
      name: "Mining",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_mining.png",
    },
    [SkillId.Cooking]: {
      name: "Cooking",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_cooking.png",
    },

    [SkillId.Melee]: {
      name: "Melee",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_melee.png",
    },
    [SkillId.Ranged]: {
      name: "Ranged",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_ranged.png",
    },
    [SkillId.Magic]: {
      name: "Magic",
      currentExp: 1,
      currentLevel: 1,
      img: "/icons/skill_magic.png",
    },
  },
  startingAbilities: Object.values(abilities).filter(
    (ability) => ability.levelReq === 1 && ability.isAutomatic === true
  ),
  startingItemContainers: Object.values(itemContainers),
};
