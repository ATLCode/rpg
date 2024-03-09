export function useWindowSize() {
  const width = ref(document.documentElement.clientWidth);
  const height = ref(document.documentElement.clientHeight);
  const sizeClass = ref("");

  function updateSize() {
    if (width.value <= 640) {
      sizeClass.value = "small";
    } else if (width.value <= 1007) {
      sizeClass.value = "medium";
    } else if (width.value <= 1008) {
      sizeClass.value = "large";
    } else {
      throw new Error("Unacceptable value as width");
    }
  }

  function updateWindowSize() {
    width.value = document.documentElement.clientWidth;
    height.value = document.documentElement.clientHeight;
  }

  onMounted(() => {
    window.addEventListener("resize", updateWindowSize);
    updateSize();
  });

  onUnmounted(() => window.removeEventListener("resize", updateWindowSize));

  return { width, height, sizeClass };
}
