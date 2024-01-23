<template>
  <div class="container">
    <div class="tabs"></div>
    <ATitle>Switch</ATitle>
    <div class="content">
      <ATitle>Coming Soon</ATitle>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  font-family: "Inter var", sans-serif;
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
