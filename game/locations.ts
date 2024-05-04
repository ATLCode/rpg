export enum LocationType {
  World,
  Container,
  Interface,
  Exit,
}

export type Marker = {
  locationId: number;
  x: number;
  y: number;
};

export type Location = {
  id: number;
  name: string;
  parent: number;
  child?: number;
  type: LocationType;
  flavorImg?: string;
  mapImg?: string;
  mapMarkers?: Marker[];
  npcs?: number[]; // Only Interfaces
  resourceSpots?: number[]; // Only Interfaces
  cookingSpots?: number[]; // Only Interfaces
  sleepingSpots?: number[]; // Only Interfaces
};

export const locations: Location[] = [
  {
    id: 0,
    name: "WorldMap",
    parent: 9001,
    type: LocationType.World,
    mapImg: "/TestMap.jpg",
    mapMarkers: [
      { locationId: 1, x: 770, y: 830 },
      { locationId: 2, x: 1000, y: 1000 },
    ],
  },
  {
    id: 1,
    name: "City",
    parent: 0,
    child: 5,
    type: LocationType.Container,
    mapImg:
      "https://cdn2.inkarnate.com/cdn-cgi/image/width=1800,height=1400/https://inkarnate-api-as-production.s3.amazonaws.com/Hnr3u3xG8TYPqk7BLnZBPR",
    mapMarkers: [
      { locationId: 3, x: 222, y: 830 },
      { locationId: 4, x: 555, y: 830 },
      { locationId: 9, x: 770, y: 830 },
    ],
  },
  {
    id: 2,
    name: "Forest",
    parent: 0,
    child: 8,
    type: LocationType.Container,
    mapImg:
      "https://www.forgotten-adventures.net/wp-content/uploads/2020/03/Forest_Pond_30x28_200dpi_Magical_Day_THUMBNAIL.jpg",
    mapMarkers: [
      { locationId: 6, x: 222, y: 830 },
      { locationId: 7, x: 555, y: 830 },
      { locationId: 8, x: 770, y: 830 },
    ],
  },
  {
    id: 3,
    name: "Shop",
    parent: 1,
    type: LocationType.Interface,
  },
  {
    id: 4,
    name: "Tavern",
    parent: 1,
    type: LocationType.Interface,
  },
  {
    id: 5,
    name: "City Gate",
    parent: 1,
    type: LocationType.Exit,
  },
  {
    id: 6,
    name: "Forest Pond",
    parent: 2,
    type: LocationType.Interface,

    resourceSpots: [1, 2],
  },
  {
    id: 7,
    name: "Cave",
    parent: 2,
    type: LocationType.Container,
  },
  {
    id: 8,
    name: "Forest Edge",
    parent: 2,
    type: LocationType.Exit,
  },
  {
    id: 9,
    name: "Arena",
    parent: 1,
    type: LocationType.Interface,
  },
];
