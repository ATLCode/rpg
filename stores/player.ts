import { type WeightedLoot } from "../types/item.types";
import type { AbilityId } from "~/game/abilities";

export type Unit = {
  isPlayer?: boolean;
  name: string;
  img: string;
  currentActionPoints: number;
  maxActionPoints: number;
  currentHealth: number;
  maxHealth: number;
  abilities: AbilityId[];
  drops?: WeightedLoot[];
  // resistances
};

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");

  // Not sure if we need energy?
  // At least in current use, things should take time rather than energy.
  // Could be used as resource system though?
  const energy = ref(100);
  /*
  const playerUnit = ref<Unit>({
    isPlayer: true,
    name: characterName.value,
    img: "/icons/21.png",
    currentActionPoints: 3,
    maxActionPoints: 3,
    currentHealth: 10,
    maxHealth: 10,
    abilities: [],
  });
  */
  const playerGroup = ref<Unit[]>([
    {
      isPlayer: true,
      name: characterName.value,
      img: "/icons/21.png",
      currentActionPoints: 3,
      maxActionPoints: 3,
      currentHealth: 10,
      maxHealth: 10,
      abilities: [],
    },
  ]);

  function useEnergy(amount: number) {
    if (energy.value < amount) {
      throw new Error("Not enough energy for the action");
    }
    energy.value -= amount;
  }

  function $reset() {
    /*
    playerUnit.value = {
      isPlayer: true,
      name: characterName.value,
      img: "/icons/21.png",
      currentActionPoints: 3,
      maxActionPoints: 3,
      currentHealth: 10,
      maxHealth: 10,
      abilities: [],
    };
    */

    playerGroup.value = [
      {
        isPlayer: true,
        name: characterName.value,
        img: "/icons/21.png",
        currentActionPoints: 3,
        maxActionPoints: 3,
        currentHealth: 10,
        maxHealth: 10,
        abilities: [],
      },
    ];
    energy.value = 100;
  }

  return {
    characterName,
    energy,
    playerGroup,
    useEnergy,
    $reset,
  };
});
