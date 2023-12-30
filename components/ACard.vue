<template>
  <div class="acard">
    <ATitle>{{ props.title }}</ATitle>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
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
</script>
<style lang="scss" scoped>
.acard {
  display: block;
  overflow: hidden;
  overflow-wrap: break-word;
  position: relative;
  padding: 0;
  text-decoration: none;
  border-radius: 4px;
  background-color: red;
}
</style>
