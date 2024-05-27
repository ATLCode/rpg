export type WeightedObject<T> = {
  id: T;
  weight: number;
};

export function chooseRandomWeightedObject<T>(
  weightedObjects: WeightedObject<T>[]
): T {
  const totalWeight = weightedObjects.reduce(
    (acc, curr) => curr.weight + acc,
    0
  );

  const magicNumber = Math.ceil(Math.random() * totalWeight);
  let foundItem: T | null = null;
  let weightToCheck = 0;
  for (const object of weightedObjects) {
    weightToCheck = weightToCheck + object.weight;
    if (weightToCheck < magicNumber) {
      continue;
    }
    foundItem = object.id;
    break;
  }
  if (foundItem === null) {
    throw new Error("Unable to find random weighted object");
  }
  return foundItem;
}
