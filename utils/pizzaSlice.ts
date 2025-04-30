import type { Coordinates } from "~/types/general.types";

export function getPizzaSlice(
  originPosition: Coordinates,
  sliceCount: number,
  offsetAngle: number,
  mousePosition: Coordinates
) {
  // Find angle between origin and mouse

  const a = mousePosition.y - originPosition.y;
  const b = mousePosition.x - originPosition.x;

  const angleToMouse =
    (((Math.atan2(a, b) + offsetAngle) % 360) * 180) / Math.PI;

  // Calculate current sector

  const currentSector = Math.floor(angleToMouse / (360 / sliceCount));

  const data = {
    currentSector,
    angleToMouse,
    mousePosition,
    a,
    b,
  };

  return { data };
}
