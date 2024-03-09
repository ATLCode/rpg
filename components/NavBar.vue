<template>
  <div class="nav">
    <ASpacer />
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="showUi = true"
        >Inventory</AButton
      >
    </div>
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="showUi = true"
        >Skills</AButton
      >
    </div>
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="showUi = true"
        >Abilities</AButton
      >
    </div>
    <ASpacer />
    <div class="btn-div">
      <AButton background-color="var(--elevation1)" @click="showCamp = true"
        >Camp</AButton
      >
    </div>
  </div>
  <div class="quit"><AButton background-color="red">Log Out</AButton></div>
  <ADialog v-model="showUi" :fullscreen="true">
    <GameUi @close="showUi = false" />
  </ADialog>
  <ADialog v-model="showCamp" :fullscreen="true">
    <CampLocation @close="showCamp = false" />
  </ADialog>
</template>

<script lang="ts" setup>
const showUi = ref(false);
const showCamp = ref(false);
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
}

.quit {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
