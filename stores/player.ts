import type { AbilityId } from "~/game/abilities";
import { defaults } from "~/game/defaults";
import { CombatSide, type Ability, type Unit } from "~/types/combat.types";

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");
  const energy = ref(100);

  const playerAbilities = ref<Ability[]>(defaults.startingAbilities);
  const playerAbilityIds = computed(() => {
    const ids: AbilityId[] = [];
    for (const item of playerAbilities.value) {
      ids.push(item.id);
    }
    return ids;
  });

  const playerGroup = ref<Unit[]>([
    {
      isPlayer: true,
      side: CombatSide.Player,
      name: characterName.value,
      img: "/icons/21.png",
      currentHealth: 10,
      maxHealth: 10,
      abilities: playerAbilityIds.value,
      position: null,
      hasMainAction: true,
      hasSideAction: true,
      resistances: {
        blunt: 0,
        slash: 0,
        pierce: 0,
      },
    },
  ]);

  function useEnergy(amount: number) {
    if (energy.value < amount) {
      throw new Error("Not enough energy for the action");
    }
    energy.value -= amount;
  }

  function $reset() {
    playerAbilities.value = defaults.startingAbilities;
    playerGroup.value = [
      {
        isPlayer: true,
        side: CombatSide.Player,
        name: characterName.value,
        img: "/icons/21.png",
        currentHealth: 10,
        maxHealth: 10,
        abilities: playerAbilityIds.value,
        position: null,
        hasMainAction: true,
        hasSideAction: true,
        resistances: {
          blunt: 0,
          slash: 0,
          pierce: 0,
        },
      },
    ];
    energy.value = 100;
  }

  return {
    characterName,
    energy,
    playerGroup,
    useEnergy,
    playerAbilities,
    playerAbilityIds,
    $reset,
  };
});
