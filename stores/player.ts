import type { AbilityId } from "~/game/abilities";
import { defaults } from "~/game/defaults";
import { CombatSide, type Ability, type Unit } from "~/types/combat.types";

export const usePlayerStore = defineStore("player", () => {
  const characterName = ref("");

  const playerAbilities = ref<Ability[]>(defaults.startingAbilities);
  const playerAbilityIds = computed(() => {
    const ids: AbilityId[] = [];
    for (const item of playerAbilities.value) {
      ids.push(item.id);
    }
    return ids;
  });
  const playerUnit = ref<Unit>({
    isPlayer: true,
    side: CombatSide.Player,
    name: characterName.value,
    img: "/icons/21.png",
    currentHealth: 10,
    maxHealth: 10,
    currentEnergy: 100,
    maxEnergy: 100,
    abilities: playerAbilityIds.value,
    position: null,
    hasMainAction: true,
    hasSideAction: true,
    resistances: {
      blunt: 0,
      slash: 0,
      pierce: 0,
      burn: 0,
      cold: 0,
    },
    cooldowns: [],
  });

  const playerGroup = ref<Unit[]>([playerUnit.value]);

  function useEnergy(amount: number) {
    if (playerUnit.value.currentEnergy < amount) {
      throw new Error("Not enough energy for the action");
    }
    playerUnit.value.currentEnergy -= amount;
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
        currentEnergy: 100,
        maxEnergy: 100,
        abilities: playerAbilityIds.value,
        position: null,
        hasMainAction: true,
        hasSideAction: true,
        resistances: {
          blunt: 0,
          slash: 0,
          pierce: 0,
          burn: 0,
          cold: 0,
        },
        cooldowns: [],
      },
    ];
  }

  return {
    characterName,
    playerGroup,
    useEnergy,
    playerAbilities,
    playerAbilityIds,
    playerUnit,
    $reset,
  };
});
