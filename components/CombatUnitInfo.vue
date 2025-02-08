<template>
  <div class="info-container">
    <div class="header">
      <h3>{{ props.unit?.name }}</h3>
      <ASpacer />
      <AButton variant="plain" padding="0rem" @click="closeInfo">X</AButton>
    </div>
    <div class="info">
      <div>HP: {{ props.unit?.currentHealth }}/{{ props.unit?.maxHealth }}</div>
      <div>Position: {{ props.unit?.position }}</div>
      <div>Main Action: {{ props.unit?.hasMainAction }}</div>
      <div>Side Action: {{ props.unit?.hasSideAction }}</div>
    </div>
    <div class="buttons">
      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: currentTab === 'Stats' }"
        @click="openTab('Stats')"
        >Stats</AButton
      >
      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: currentTab === 'Inventory' }"
        @click="openTab('Inventory')"
        >Inventory</AButton
      >
      <AButton
        border-radius="0px"
        background-color="var(--elevation1)"
        :class="{ selected: currentTab === 'Gear' }"
        @click="openTab('Gear')"
        >Gear</AButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Unit } from "~/types/combat.types";

const props = defineProps({
  unit: {
    type: Object as PropType<Unit | null>,
    default: null,
  },
});

const model = defineModel({ type: Boolean });

const currentTab = ref<string | undefined>(undefined);

function openTab(tab: string) {
  currentTab.value = tab;
}
function closeInfo() {
  model.value = false;
}
</script>

<style lang="scss" scoped>
.info-container {
  height: 350px;
  width: 300px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: var(--elevation2);
}
.header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}
.info {
  height: 100%;
  width: 100%;
  padding: 1rem;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .selected {
    background-color: var(--elevation2) !important;
  }
}
</style>
