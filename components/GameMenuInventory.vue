<template>
  <div class="inv-menu-container">
    <div class="inv-menu-header"><h1>Inventory</h1></div>
    <div class="inv-menu-content">
      <GameInventory />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.inv-menu-container {
  height: 100%;
  width: 100%;
  border: 1px grey solid;
}
.inv-menu-header {
  width: 100%;
  text-align: center;
}
.inv-menu-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
