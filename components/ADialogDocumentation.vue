<template>
  <div class="container">
    <div class="tabs"></div>
    <ATitle>Dialog</ATitle>
    <div class="content">
      <ATitle>Basic</ATitle>
      <ACard>
        {{ dialogOpen }}
        <AButton @click="dialogOpen = !dialogOpen">Open Dialog</AButton>
        <ADialog :open="dialogOpen">Content Here!</ADialog></ACard
      >
      <ACard
        ><div>&lt;AButton&gt;Open Dialog&lt;/AButton&gt;</div>
        <div>
          &lt;ADialog :open="dialogOpen"&gt;Content Here!&lt;/ADialog&gt;
        </div>
      </ACard>
    </div>
  </div>
</template>

<script setup lang="ts">
const dialogOpen = ref(false);
</script>

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
