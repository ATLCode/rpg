<template>
  <div class="container">
    <div class="tabs"></div>
    <ATitle>Basic</ATitle>
    <div class="content">
      <ATitle>Coming Soon</ATitle>
      <ACard
        ><div class="example">Text <ASpacer /> More text</div></ACard
      >
      <ACard> &lt;div &gt;Text &lt;Spacer/&gt; More text&lt;/div&gt; </ACard>
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
.example {
  display: flex;
}
</style>
