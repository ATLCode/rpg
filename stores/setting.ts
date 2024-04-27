export const useSettingStore = defineStore("setting", () => {
  const showMap = ref(false);

  function changeMap() {
    showMap.value = !showMap.value;
  }

  return { showMap, changeMap };
});
