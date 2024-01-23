<template>
  <div class="container">
    <div class="tabs"></div>
    <ATitle>Checkbox</ATitle>
    <div class="content">
      <ATitle>Basic</ATitle>
      <ACard><ACheckbox></ACheckbox></ACard>
      <ACard> &lt;ACheckbox&gt;&lt;/ACheckbox&gt; </ACard>
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
