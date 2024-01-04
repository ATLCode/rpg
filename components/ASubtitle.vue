<template>
  <div class="asubtitle">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.asubtitle {
  display: block;
  flex: none;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  opacity: 1;
  overflow: hidden;
  padding: 0 1rem;
  text-overflow: ellipsis;
  text-transform: none;
  white-space: nowrap;
}
</style>
