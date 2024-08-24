<template>
  <div class="gear-menu-container">
    <div class="gear-menu-header"><h1>Gear</h1></div>
    <div class="gear-menu-content"><GameGear /></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.gear-menu-container {
  height: 100%;
  width: 100%;
  border: 1px grey solid;
}
.gear-menu-header {
  width: 100%;
  text-align: center;
}
.gear-menu-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
