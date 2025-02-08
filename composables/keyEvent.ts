import { onMounted, onUnmounted } from "vue";

export function useEvent(key: string, methodToTrigger: Function) {
  const handleKey = (event: KeyboardEvent) => {
    if (event.code === key) {
      methodToTrigger();
    }
  };

  onMounted(() => window.addEventListener("keydown", handleKey));
  onUnmounted(() => window.removeEventListener("keydown", handleKey));
}
