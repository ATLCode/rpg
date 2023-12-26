<template>
  <div class="container">
    <svg
      class="progress"
      viewBox="0 0 40px 40px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="circle" cx="20" cy="20" r="18"></circle>
      <text x="20" y="20" text-anchor="middle" alignment-baseline="middle">
        test
      </text>
    </svg>
    <div class="progress-content">50</div>
  </div>
</template>
<script lang="ts" setup>
/*
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "",
  },
});
*/
</script>
<style lang="scss" scoped>
$spinnerSize: 40;
.container {
  height: $spinnerSize + px;
  width: $spinnerSize + px;
}

.progress {
  width: $spinnerSize + px;
  height: $spinnerSize + px;

  .circle {
    fill: transparent;
    stroke: red;
    stroke-width: 4;
    z-index: 1;
    stroke-linecap: round;
    stroke-dasharray: (3.14 * $spinnerSize);
    transform-origin: (0.5px * $spinnerSize) (0.5px * $spinnerSize) 0;
    animation: progress 2s linear infinite;
  }
  .progress-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@keyframes progress {
  0% {
    stroke-dashoffset: (0.66 * $spinnerSize);
    transform: rotate(0deg);
  }
  50% {
    stroke-dashoffset: (3.14 * $spinnerSize);
    transform: rotate(720deg);
  }
  100% {
    stroke-dashoffset: (0.66 * $spinnerSize);
    transform: rotate(1080deg);
  }
}
</style>
