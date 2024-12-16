import { ref, computed } from "vue";

export function useProgress(
  allowed: Ref<boolean>,
  length: number,
  callback: () => void
) {
  const active = computed(() => {
    if (actionInterval.value) {
      return true;
    }
    return false;
  });

  const isAllowedToRun = computed(() => {
    if (allowed.value === false || isPaused.value === true) {
      return false;
    }
    return true;
  });

  const currentProgress = ref(0);
  const progressLength = ref(length);
  const isPaused = ref(false);

  const actionInterval = ref<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  function start() {
    if (actionInterval.value !== undefined || !isAllowedToRun.value) {
      return;
    }
    actionInterval.value = setInterval(() => {
      progressAction(1);
    }, 10);
  }
  function progressAction(progressAmount: number) {
    if (!isAllowedToRun.value) {
      return;
    }
    if (currentProgress.value >= progressLength.value) {
      loopAction();
    }
    currentProgress.value = currentProgress.value + progressAmount;
  }

  function loopAction() {
    currentProgress.value = 0;
    callback();
  }

  function stop() {
    currentProgress.value = 0;
    clearInterval(actionInterval.value);
    actionInterval.value = undefined;
  }

  function pause() {
    isPaused.value = true;
  }
  function unpause() {
    isPaused.value = false;
  }

  watch(allowed, (newAllowed) => {
    if (!newAllowed) {
      stop();
    }
  });

  onUnmounted(() => {
    stop();
  });

  return {
    active,
    currentProgress,
    progressLength,
    start,
    stop,
    pause,
    unpause,
  };
}
