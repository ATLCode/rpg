import type { Unit } from "~/types/combat.types";

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");
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
