import type {
  AreaLocationId,
  SubLocationId,
  WorldLocationId,
} from "~/game/locations";
import type { NpcId } from "~/game/npcs";
import type { SpotId } from "~/game/spots";

export enum LocationType {
  Container = "Container",
  Dungeon = "Dungeon",
  Spot = "Spot",
  Npc = "Npc",
  Camp = "Camp",
  Exit = "Exit",
}
export enum ContainerType {
  GeneralStore = "GeneralStore",
  Inn = "Inn",
  Mine = "Mine",
}

// Area location type exit and exit details?

export type Camp = {
  sleepingSpot: {
    name: string;
    coordinates: { x: number; y: number };
    spotId: SpotId;
  };
  cookingSpot: {
    name: string;
    coordinates: { x: number; y: number };
    spotId: SpotId;
  };
  storageSpot: {
    name: string;
    coordinates: { x: number; y: number };
    // storageSpotId: StorageSpotId;
  };
};

export type locationContainerDetails = {
  outsideImg: string;
  mapImg: string;
  child?: SubLocationId;
  locations?: SubLocationId[];
  containerType: ContainerType;
};
export type locationDungeonDetails = {
  outsideImg: string;
  mapImg: string;
  child?: SubLocationId;
  locations?: SubLocationId[];
};
export type SubLocation = {
  id: SubLocationId;
  name: string;
  type: LocationType;
  coordinates: { x: number; y: number };
  spotId?: SpotId;
  npcId?: NpcId;
};
export type AreaLocation = {
  id: AreaLocationId;
  name: string;
  type: LocationType;
  coordinates: { x: number; y: number };
  spotId?: SpotId;
  npcId?: NpcId;
  containerDetails?: locationContainerDetails;
  dungeonDetails?: locationDungeonDetails;
};
export type WorldLocation = {
  id: WorldLocationId;
  name: string;
  coordinates: { x: number; y: number };
  mapImg: string;
  child: AreaLocationId;
  locations: AreaLocationId[];
};

export type PlayerLocation = {
  worldLocation: WorldLocation;
  areaLocation: AreaLocation | null;
  subLocation: SubLocation | null;
};
