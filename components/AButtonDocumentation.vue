<template>
  <div class="container">
    <div class="tabs"></div>
    <ATitle>Button</ATitle>
    <div class="content">
      <div class="section">
        <ATitle>Basic</ATitle>
        <ACard><AButton>Click Me</AButton></ACard>
        <ACard> &lt;AButton&gt;Click Me&lt;/AButton&gt; </ACard>
      </div>
      <div class="section">
        <ATitle>Prepend & Append</ATitle>
        <ACard>
          <AButton>
            <template #prepend>Prepended</template>Click Me
            <template #append>Appended</template></AButton
          ></ACard
        >

        <ACard>
          <div>&lt;AButton&gt;</div>
          <div>
            &emsp;&lt;template #prepend&gt;Prepended&lt;/template&gt;
            <span class="instruction"></span>
          </div>
          <div>&emsp;&emsp;Click Me <span class="instruction"></span></div>
          <div>
            &emsp;&lt;template #append&gt;Appended&lt;/template&gt;
            <span class="instruction"></span>
          </div>
          <div>&lt;/AButton&gt;</div>
        </ACard>
      </div>
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
.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
