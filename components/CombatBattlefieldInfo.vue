<template>
  <div class="info-container">
    <AButton
      border-radius="0px"
      background-color="var(--elevation1)"
      @click="extendedInfoOpen = !extendedInfoOpen"
      >Battlefield</AButton
    >
    <div v-if="extendedInfoOpen" class="extended-info">Test</div>
  </div>
</template>

<script lang="ts" setup>
const extendedInfoOpen = ref(false);
</script>

<style lang="scss" scoped>
.info-container {
  width: 300px;
  display: flex;
  flex-direction: column;
}
.extended-info {
  height: 300px;
  width: 300px;
  background-color: var(--elevation2);
}
</style>
