<template>
  <div class="container">
    <div class="tabs"></div>
    <ATitle>Checkbox</ATitle>
    <div class="content">
      <ATitle>Basic</ATitle>
      <ACard>
        <div>Some text</div>
        <ADivider></ADivider>
        <div>Some more text</div>
      </ACard>
      <ACard>
        <div>&lt;div&gt;Some text&lt;/div&gt;</div>
        <div>&lt;ADivider&gt;&lt;/ADivider&gt;</div>
        <div>&lt;div&gt;Some more text&lt;/div&gt;</div>
      </ACard>
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
