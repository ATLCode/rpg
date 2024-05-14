import {
  ResourceSpotId,
  type CookingSpotId,
  type SleepingSpotId,
} from "./spots";

import { NpcId } from "./npcs";

export enum LocationType {
  World,
  Container,
  Interface,
  Exit,
}
export enum LocationId {
  None,
  WorldMap,
  Town,
  Forest,
  Shop,
  Tavern,
  CityGate,
  ForestPond,
  ForestEdge,
  Arena,
  Cave,
}

export type Marker = {
  locationId: LocationId;
  x: number;
  y: number;
};

export type Location = {
  name: string;
  parent: LocationId;
  child?: LocationId;
  type: LocationType;
  flavorImg?: string;
  mapImg?: string;
  mapMarkers?: Marker[];
  npcs?: NpcId[]; // Only Interfaces
  resourceSpots?: ResourceSpotId[]; // Only Interfaces
  cookingSpots?: CookingSpotId[]; // Only Interfaces
  sleepingSpots?: SleepingSpotId[]; // Only Interfaces
};

export const locations: Record<LocationId, Location> = {
  [LocationId.None]: {
    name: "None",
    parent: LocationId.None,
    type: LocationType.World,
    mapImg: "",
  },
  [LocationId.WorldMap]: {
    name: "WorldMap",
    parent: LocationId.None,
    type: LocationType.World,
    mapImg: "/maps/TestMap.jpg",
    mapMarkers: [
      { locationId: LocationId.Town, x: 770, y: 830 },
      { locationId: LocationId.Forest, x: 1000, y: 1000 },
    ],
  },
  [LocationId.Town]: {
    name: "Town",
    parent: LocationId.WorldMap,
    child: LocationId.CityGate,
    type: LocationType.Container,
    mapImg: "/maps/town.jpeg",
    mapMarkers: [
      { locationId: LocationId.Shop, x: 1000, y: 730 },
      { locationId: LocationId.Tavern, x: 555, y: 830 },
      { locationId: LocationId.CityGate, x: 70, y: 170 },
      { locationId: LocationId.Arena, x: 770, y: 830 },
    ],
  },
  [LocationId.Forest]: {
    name: "Forest",
    parent: LocationId.WorldMap,
    child: LocationId.ForestEdge,
    type: LocationType.Container,
    mapImg:
      "https://www.forgotten-adventures.net/wp-content/uploads/2020/03/Forest_Pond_30x28_200dpi_Magical_Day_THUMBNAIL.jpg",
    mapMarkers: [
      { locationId: LocationId.ForestPond, x: 375, y: 330 },
      { locationId: LocationId.Cave, x: 750, y: 650 },
      { locationId: LocationId.ForestEdge, x: 280, y: 830 },
    ],
  },
  [LocationId.Shop]: {
    name: "Shop",
    parent: LocationId.Town,
    type: LocationType.Interface,
  },
  [LocationId.Tavern]: {
    name: "Tavern",
    parent: LocationId.Town,
    type: LocationType.Interface,
    npcs: [NpcId.Harold],
  },
  [LocationId.CityGate]: {
    name: "City Gate",
    parent: LocationId.Town,
    type: LocationType.Exit,
  },
  [LocationId.ForestPond]: {
    name: "Forest Pond",
    parent: LocationId.Forest,
    type: LocationType.Interface,
    resourceSpots: [ResourceSpotId.SmallFishingSpot, ResourceSpotId.OakTree],
  },
  [LocationId.Cave]: {
    name: "Cave",
    parent: LocationId.Forest,
    type: LocationType.Container,
  },
  [LocationId.ForestEdge]: {
    name: "Forest Edge",
    parent: LocationId.Forest,
    type: LocationType.Exit,
  },
  [LocationId.Arena]: {
    name: "Arena",
    parent: LocationId.Town,
    type: LocationType.Interface,
  },
};
