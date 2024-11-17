import { NpcId } from "./npcs";
import { SpotId } from "./spots";
import {
  ContainerType,
  LocationType,
  type AreaLocation,
  type SubLocation,
  type WorldLocation,
} from "~/types/location.types";

// WORLD LOCATIONS
export enum WorldLocationId {
  Town = "Town",
  Forest = "Forest",
  Mountain = "Mountain",
}
export enum AreaLocationId {
  ForestEdge = "ForestEdge",
  TownEdge = "TownEdge",
  TownShop = "TownShop",
  TownInn = "TownInn",
  ForestWoodcuttingSpot = "ForestWoodcuttingSpot",
  ForestFishingSpot = "ForestFishingSpot",
  ForestCampfire = "ForestCampfire",
  MountainTent = "MountainTent",
  MountainMine = "MountainMine",
  MountainTree = "MountainTree",
  MountainBottom = "MountainBottom",
}
export enum SubLocationId {
  ShopEnterance = "ShopEnterance",
  ShopShopkeepper = "ShopShopkeepper",
}
export const worldLocations: Record<WorldLocationId, WorldLocation> = {
  [WorldLocationId.Town]: {
    id: WorldLocationId.Town,
    name: "Town",
    coordinates: { x: 1000, y: 830 },
    mapImg: "/maps/town.jpeg",
    child: AreaLocationId.TownEdge,
    locations: [
      AreaLocationId.TownEdge,
      AreaLocationId.TownShop,
      AreaLocationId.TownInn,
    ],
  },
  [WorldLocationId.Forest]: {
    id: WorldLocationId.Forest,
    name: "Forest",
    coordinates: { x: 1030, y: 940 },
    mapImg:
      "https://www.forgotten-adventures.net/wp-content/uploads/2020/03/Forest_Pond_30x28_200dpi_Magical_Day_THUMBNAIL.jpg",
    child: AreaLocationId.ForestEdge,
    locations: [
      AreaLocationId.ForestEdge,
      AreaLocationId.ForestFishingSpot,
      AreaLocationId.ForestWoodcuttingSpot,
      AreaLocationId.ForestCampfire,
    ],
  },
  [WorldLocationId.Mountain]: {
    id: WorldLocationId.Mountain,
    name: "Mountain",
    coordinates: { x: 1070, y: 1020 },
    mapImg: "/maps/mountain.jpg",
    child: AreaLocationId.MountainBottom,
    locations: [
      AreaLocationId.MountainBottom,
      AreaLocationId.MountainMine,
      AreaLocationId.MountainTent,
      AreaLocationId.MountainTree,
    ],
  },
};
// AREA LOCATIONS
export const areaLocations: Record<AreaLocationId, AreaLocation> = {
  [AreaLocationId.TownEdge]: {
    id: AreaLocationId.TownEdge,
    name: "Town Edge",
    type: LocationType.Exit,
    coordinates: { x: 100, y: 230 },
  },
  [AreaLocationId.TownShop]: {
    id: AreaLocationId.TownShop,
    name: "General Store",
    type: LocationType.Container,
    coordinates: { x: 800, y: 600 },
    containerDetails: {
      outsideImg: "outsideImgPathHere",
      mapImg: "/maps/shop.jpeg",
      child: SubLocationId.ShopEnterance,
      locations: [SubLocationId.ShopEnterance, SubLocationId.ShopShopkeepper],
      containerType: ContainerType.GeneralStore,
    },
  },
  [AreaLocationId.TownInn]: {
    id: AreaLocationId.TownInn,
    name: "Inn",
    type: LocationType.Container,
    coordinates: { x: 1000, y: 720 },
    containerDetails: {
      outsideImg: "outsideImgPathHere",
      mapImg: "/maps/shop.jpeg",
      child: SubLocationId.ShopEnterance,
      locations: [SubLocationId.ShopEnterance, SubLocationId.ShopShopkeepper],
      containerType: ContainerType.Inn,
    },
  },

  [AreaLocationId.ForestEdge]: {
    id: AreaLocationId.ForestEdge,
    name: "Forest Edge",
    type: LocationType.Exit,
    coordinates: { x: 300, y: 800 },
  },
  [AreaLocationId.ForestWoodcuttingSpot]: {
    id: AreaLocationId.ForestWoodcuttingSpot,
    name: "Fishing Spot",
    type: LocationType.Spot,
    coordinates: { x: 530, y: 410 },
    spotId: SpotId.OakTree,
  },
  [AreaLocationId.ForestFishingSpot]: {
    id: AreaLocationId.ForestFishingSpot,
    name: "Oak Tree",
    type: LocationType.Spot,
    coordinates: { x: 370, y: 320 },
    spotId: SpotId.SmallFishingSpot,
  },
  [AreaLocationId.ForestCampfire]: {
    id: AreaLocationId.ForestCampfire,
    name: "Campfire",
    type: LocationType.Spot,
    coordinates: { x: 400, y: 350 },
    spotId: SpotId.Campfire,
  },
  [AreaLocationId.MountainTree]: {
    id: AreaLocationId.MountainTree,
    name: "Dead Tree",
    type: LocationType.Spot,
    coordinates: { x: 1570, y: 1030 },
    spotId: SpotId.OakTree,
  },
  [AreaLocationId.MountainTent]: {
    id: AreaLocationId.MountainTent,
    name: "Tent",
    type: LocationType.Container,
    coordinates: { x: 970, y: 1360 },
    containerDetails: {
      outsideImg: "outsideImgPathHere",
      mapImg: "",
      child: SubLocationId.ShopEnterance,
      locations: [SubLocationId.ShopEnterance, SubLocationId.ShopShopkeepper],
      containerType: ContainerType.GeneralStore,
    },
  },
  [AreaLocationId.MountainMine]: {
    id: AreaLocationId.MountainMine,
    name: "Old Mine",
    type: LocationType.Container,
    coordinates: { x: 650, y: 970 },
    containerDetails: {
      outsideImg: "outsideImgPathHere",
      mapImg: "",
      child: SubLocationId.ShopEnterance,
      locations: [SubLocationId.ShopEnterance, SubLocationId.ShopShopkeepper],
      containerType: ContainerType.Mine,
    },
  },
  [AreaLocationId.MountainBottom]: {
    id: AreaLocationId.MountainMine,
    name: "Bottom of the Mountain",
    type: LocationType.Exit,
    coordinates: { x: 1450, y: 300 },
  },
};

// AREA LOCATIONS
export const subLocations: Record<SubLocationId, SubLocation> = {
  [SubLocationId.ShopEnterance]: {
    id: SubLocationId.ShopEnterance,
    name: "Shop Enterance",
    type: LocationType.Exit,
    coordinates: { x: 1120, y: 250 },
  },
  [SubLocationId.ShopShopkeepper]: {
    id: SubLocationId.ShopShopkeepper,
    name: "Shopkeepper",
    type: LocationType.Npc,
    coordinates: { x: 1110, y: 670 },
    npcId: NpcId.Harold,
  },
};
