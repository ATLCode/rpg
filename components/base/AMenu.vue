<template>
  <div class="a-menu">
    <slot name="prepend" />
    <div class="activator-slot" @click="menuVisible = !menuVisible">
      <slot name="activator"></slot>
    </div>

    <div class="menu-slot" :class="{ 'menu-open': menuVisible }">
      <slot name="menu"></slot>
    </div>

    <slot name="append" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "text",
  },
  variant: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: null,
  },
});

const menuVisible = ref(false);
</script>
<style lang="scss" scoped>
.afield {
  display: flex;
  align-items: center;
}

.input {
  padding: 15px;
  border: 1px solid grey !important;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  border: 0px transparent;
  width: 100%;
  height: 100%;
  background-color: transparent;
  &:focus {
    border: 1px solid white !important;
    outline: none !important;
  }
}
.a-menu {
  z-index: 500;
}
.activator-slot {
  display: flex;
  justify-content: end;
}
.menu-slot {
  display: none;
}
.menu-open {
  z-index: 500;
  display: block;
  border-radius: 10px;
  background-color: var(--elevation2);
  :nth-child(n) {
    padding: 1rem;
    z-index: 500;
    cursor: pointer;
    &:hover {
      border-radius: 10px;
      background-color: var(--elevation3);
    }
  }
}
</style>
