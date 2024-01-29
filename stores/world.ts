export const useWorldStore = defineStore("world", () => {
  const viewLocations = ref([]);
  const viewPaths = ref([]);

  return { viewLocations, viewPaths };
});
