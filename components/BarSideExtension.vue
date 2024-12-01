<template>
  <ACard
    position="fixed"
    :offset="['auto', '0px', '15vh', '0px']"
    :margin="['auto', 'auto', 'auto', 'auto']"
    :height="'70vh'"
    :width="'1200px'"
    :z-index="'500'"
  >
    <div class="card-header">
      <ASpacer />
      {{ props.openTab.toUpperCase() }}
      <ASpacer />
      <AButton variant="plain" padding="0rem" @click="$emit('close')"
        >X</AButton
      >
    </div>
    <div class="card-content">
      <div v-if="openTab === 'Inventory'" class="gear-inventory">
        <div class="gear-inventory-container"><GameGear /></div>
        <div class="gear-inventory-container"><GameInventory /></div>
      </div>
      <div v-if="openTab === 'Skills'">Skills Test</div>
      <div v-if="openTab === 'Abilities'">Abilities Test</div>
      <div v-if="openTab === 'Quests'">Quests Test</div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
const props = defineProps({
  openTab: {
    type: String,
    default: "Inventory",
  },
});

defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: center;
}
.card-content {
  height: 100%;
  width: 100%;
  .gear-inventory {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .gear-inventory-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
