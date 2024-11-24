import type { WeightedEncounter } from "~/game/encounters";
import type {
  AreaLocationId,
  MapId,
  PinId,
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

export enum PinType {
  Npc = "Npc",
  Spot = "Spot",
  Travel = "Travel", // All world map pinss
  Access = "Access", // Entry or exit from area or small maps
  Code = "Code", // From random stuff
}

export type Location = {
  mapId: MapId;
  pinId: PinId;
};

export type Map = {
  id: MapId;
  name: string;
  mapScale: "World" | "Area" | "Small";
  img: string;
  pins: PinId[];
  parent: MapId | null;
  encounters?: WeightedEncounter[];
  safetyLevel?: number | (() => number); // Dangerous area vs Dangerous building, like thieves den etc.
};

export type Pin = {
  id: PinId;
  name: string;
  type: PinType;
  target: Location | NpcId | SpotId; // NpcId? SpotId? TrueLocation for access? Circular dependency issue
  icon: string;
  coordinates: { x: number; y: number };
  isVisible: boolean | (() => boolean); // Should this be optional and we assume true unless there is possibility it's false?
};
