<template>
  <div v-show="value" class="anotification">
    <slot></slot>
    <AButton v-if="props.close">Close</AButton>
  </div>
</template>
<script lang="ts" setup>
// Not these props, these variables will be taken from store
const props = defineProps({
  close: {
    type: Boolean,
    default: false,
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

const value = defineModel<boolean>();
</script>
<style lang="scss" scoped>
.anotification {
  background-color: red;
  z-index: 2;
  position: absolute;
  top: 1rem;
  right: 0;
  bottom: none;
  left: 0;
  margin: auto;
  height: fit-content;
  width: 80vw;
  padding: 1rem;
  border-radius: 10px;
}
</style>
