export const useSettingStore = defineStore("setting", () => {
  const showMap = ref(true);

  function changeMap() {
    showMap.value = !showMap.value;
  }

  return { showMap, changeMap };
});
