import { NpcId } from "./npcs";
import { SpotId } from "./spots";
import {
  ContainerType,
  LocationType,
  PinType,
  type AreaLocation,
  type Map,
  type Pin,
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

export enum MapId {
  World = "World",
  Town = "Town",
  Forest = "Forest",
  Mountain = "Mountain",
  Camp = "Camp",
}

export enum PinId {
  Town = "Town",
  TownEdge = "TownEdge",
  Forest = "Forest",
  ForestEdge = "ForestEdge",
  ForestCampFire = "ForestCampfire",
  Mountain = "Mountain",
  MountainBottom = "MountainBottom",
  ForestWoodcutting = "ForestWoodcutting",
  ForestFishing = "ForestFishing",
  CampEdge = "CampEdge",
}

export const maps: Record<MapId, Map> = {
  [MapId.World]: {
    id: MapId.World,
    name: "World Map",
    mapScale: "World",
    img: "/maps/world.jpg",
    pins: [PinId.Forest, PinId.Town, PinId.Mountain],
    encounters: [],
    parent: null,
  },
  [MapId.Town]: {
    id: MapId.Town,
    name: "Town",
    mapScale: "Area",
    img: "/maps/town.jpeg",
    pins: [PinId.TownEdge],
    encounters: [],
    parent: MapId.World,
  },
  [MapId.Forest]: {
    id: MapId.Forest,
    name: "Forest",
    mapScale: "Area",
    img: "/maps/forest.jpg",
    pins: [
      PinId.ForestEdge,
      PinId.ForestWoodcutting,
      PinId.ForestFishing,
      PinId.ForestCampFire,
    ],
    encounters: [],
    parent: MapId.World,
  },
  [MapId.Mountain]: {
    id: MapId.Mountain,
    name: "Mountain",
    mapScale: "Area",
    img: "/maps/mountain.jpg",
    pins: [PinId.MountainBottom],
    encounters: [],
    parent: MapId.World,
  },
  [MapId.Camp]: {
    id: MapId.Camp,
    name: "Camp",
    mapScale: "Area",
    img: "/maps/camp.jpeg",
    pins: [PinId.CampEdge],
    encounters: [],
    parent: MapId.World,
  },
};

export const pins: Record<PinId, Pin> = {
  [PinId.Town]: {
    id: PinId.Town,
    name: "Town",
    type: PinType.Travel,
    target: { mapId: MapId.Town, pinId: PinId.TownEdge },
    icon: "/icons/pin_travel.png",
    coordinates: { x: 1000, y: 830 },
    isVisible: true,
  },
  [PinId.Forest]: {
    id: PinId.Forest,
    name: "Forest",
    type: PinType.Travel,
    target: { mapId: MapId.Forest, pinId: PinId.ForestEdge },
    icon: "/icons/pin_travel.png",
    coordinates: { x: 1030, y: 940 },
    isVisible: true,
  },
  [PinId.Mountain]: {
    id: PinId.Mountain,
    name: "Mountain",
    type: PinType.Travel,
    target: { mapId: MapId.Mountain, pinId: PinId.MountainBottom },
    icon: "/icons/pin_travel.png",
    coordinates: { x: 1070, y: 1020 },
    isVisible: true,
  },
  [PinId.TownEdge]: {
    id: PinId.TownEdge,
    name: "Town Edge",
    type: PinType.Access,
    target: { mapId: MapId.World, pinId: PinId.Town },
    icon: "/icons/pin_exit.png",
    coordinates: { x: 100, y: 200 },
    isVisible: true,
  },
  [PinId.ForestEdge]: {
    id: PinId.ForestEdge,
    name: "Forest Edge",
    type: PinType.Access,
    target: { mapId: MapId.World, pinId: PinId.Forest },
    icon: "/icons/pin_exit.png",
    coordinates: { x: 1650, y: 200 },
    isVisible: true,
  },
  [PinId.ForestCampFire]: {
    id: PinId.ForestCampFire,
    name: "Forest campfire",
    type: PinType.Spot,
    target: SpotId.Campfire,
    icon: "/icons/spot_cooking.png",
    coordinates: { x: 900, y: 1030 },
    isVisible: true,
  },
  [PinId.MountainBottom]: {
    id: PinId.MountainBottom,
    name: "Bottom of the Mountain",
    type: PinType.Access,
    target: { mapId: MapId.World, pinId: PinId.Mountain },
    icon: "/icons/pin_exit.png",
    coordinates: { x: 1070, y: 1020 },
    isVisible: true,
  },
  [PinId.ForestWoodcutting]: {
    id: PinId.ForestWoodcutting,
    name: "Oak Tree",
    type: PinType.Spot,
    target: SpotId.OakTree,
    icon: "/icons/spot_woodcutting.png",
    coordinates: { x: 320, y: 420 },
    isVisible: true,
  },
  [PinId.ForestFishing]: {
    id: PinId.ForestFishing,
    name: "Fishing Spot",
    type: PinType.Spot,
    target: SpotId.SmallFishingSpot,
    icon: "/icons/spot_fishing.png",
    coordinates: { x: 775, y: 1030 },
    isVisible: true,
  },
  [PinId.CampEdge]: {
    id: PinId.CampEdge,
    name: "Camp Edge",
    type: PinType.Access,
    target: "ExitCamp",
    icon: "/icons/pin_exit.png",
    coordinates: { x: 100, y: 100 },
    isVisible: true,
  },
};
