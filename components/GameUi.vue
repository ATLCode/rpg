<template>
  <div class="ui-container">
    <div class="ui-tabs">
      <ASpacer />
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'inventory' }"
        @click="selectedTab = 'inventory'"
        >Inventory</AButton
      >
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'skills' }"
        @click="selectedTab = 'skills'"
        >Skills</AButton
      >
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'abilities' }"
        @click="selectedTab = 'abilities'"
        >Abilities</AButton
      >
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'quests' }"
        @click="selectedTab = 'quests'"
        >Quests</AButton
      >
      <ASpacer />
      <AButton
        variant="plain"
        :class="{ activeTab: selectedTab === 'settings' }"
        @click="selectedTab = 'settings'"
        >Settings</AButton
      >
      <AButton background-color="var(--elevation1)" @click="$emit('close')"
        >Close</AButton
      >
    </div>
    <div class="ui-content">
      <div v-if="selectedTab === 'inventory'" class="inventory">
        <div>Gear</div>
        <div>Inventory</div>
      </div>
      <div v-if="selectedTab === 'skills'" class="skills">Skills</div>
      <div v-if="selectedTab === 'abilities'" class="abilities">Abilities</div>
      <div v-if="selectedTab === 'quests'" class="settings">Quests TBD</div>
      <div v-if="selectedTab === 'settings'" class="settings">Settings</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["close"]);

const selectedTab = ref("inventory");
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
