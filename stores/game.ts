export enum GameState {
  Normal = "Normal",
  Travel = "Travel",
  Combat = "Combat",
  Encounter = "Encounter",
}

export const useGameStore = defineStore("game", () => {
  const gameState = ref<GameState>(GameState.Normal);

  return { gameState };
});
