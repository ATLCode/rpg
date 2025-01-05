import { CombatSide, type Unit } from "~/types/combat.types";

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");
  const energy = ref(100);

  const playerGroup = ref<Unit[]>([
    {
      isPlayer: true,
      side: CombatSide.Player,
      name: characterName.value,
      img: "/icons/21.png",
      currentHealth: 10,
      maxHealth: 10,
      abilities: [],
      position: null,
    },
  ]);

  function useEnergy(amount: number) {
    if (energy.value < amount) {
      throw new Error("Not enough energy for the action");
    }
    energy.value -= amount;
  }

  function $reset() {
    playerGroup.value = [
      {
        isPlayer: true,
        side: CombatSide.Player,
        name: characterName.value,
        img: "/icons/21.png",
        currentHealth: 10,
        maxHealth: 10,
        abilities: [],
        position: null,
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
