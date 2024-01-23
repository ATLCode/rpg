<template>
  <div class="atitle">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.atitle {
  display: block;
  font-size: 1.25rem;
  font-weight: 500;
  hyphens: auto;
  letter-spacing: 0.0125em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5rem 1rem;
  text-transform: none;
  white-space: nowrap;
  word-break: normal;
  word-wrap: break-word;
  color: var(--text);
}
</style>
