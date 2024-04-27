<template>
  <div class="ui-container">
    <div class="ui-tabs">
      <ASpacer />
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'Inventory' }"
        @click="selectedTab = 'Inventory'"
        >Inventory</AButton
      >
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'Skills' }"
        @click="selectedTab = 'Skills'"
        >Skills</AButton
      >
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'Abilities' }"
        @click="selectedTab = 'Abilities'"
        >Abilities</AButton
      >
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'Quests' }"
        @click="selectedTab = 'Quests'"
        >Quests</AButton
      >
      <ASpacer />
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'Settings' }"
        @click="selectedTab = 'Settings'"
        >Settings</AButton
      >
      <AButton background-color="var(--elevation1)" @click="$emit('close')"
        >Close</AButton
      >
    </div>
    {{ initialTab }}
    {{ selectedTab }}
    <div class="ui-content">
      <div v-if="selectedTab === 'Inventory'" class="inventory">
        <div>Gear</div>
        <GameMenuInventory />
      </div>
      <div v-if="selectedTab === 'Skills'" class="skills">
        <GameMenuSkills />
      </div>
      <div v-if="selectedTab === 'Abilities'" class="abilities">Abilities</div>
      <div v-if="selectedTab === 'Quests'" class="settings">Quests TBD</div>
      <div v-if="selectedTab === 'Settings'" class="settings">Settings</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  initialTab: {
    type: String,
    default: "inventory",
  },
});

defineEmits(["close"]);

const selectedTab = ref("inventory");

// Created
selectedTab.value = props.initialTab;
</script>

<style lang="scss" scoped>
.ui-container {
  height: 100%;
  .ui-tabs {
    display: flex;
    flex-direction: row;
  }
  .activeTab {
    background-color: var(--elevation1) !important;
  }
  .ui-content {
    height: 100%;
    .inventory {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
