export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const currentLocation = ref(1);

  return { name, currentLocation };
});
