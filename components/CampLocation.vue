<template>
  <div class="header">
    <ASpacer />
    <h1>Camp</h1>
    <ASpacer />
    <AButton background-color="var(--elevation1)" @click="$emit('close')"
      >Close</AButton
    >
  </div>
</template>

<script lang="ts" setup>
defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
}
</style>
