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
      <AButton background-color="var(--elevation1)" @click="$emit('close')"
        >Close</AButton
      >
    </div>

    <div class="ui-content">
      <div v-if="selectedTab === 'Inventory'" class="inventory">
        <GameMenuGear />
        <GameMenuInventory />
      </div>
      <div v-if="selectedTab === 'Skills'" class="skills">
        <GameMenuSkills />
      </div>
      <div v-if="selectedTab === 'Abilities'" class="abilities">
        <GameMenuAbilities />
      </div>
      <div v-if="selectedTab === 'Quests'" class="settings">Quests TBD</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEvent } from "@/composables/keyEvent";

const props = defineProps({
  initialTab: {
    type: String,
    default: "inventory",
  },
});

const emit = defineEmits(["close"]);

const selectedTab = ref("inventory");

function closeMenu() {
  console.log("asd");
  emit("close");
}

// Created
selectedTab.value = props.initialTab;
// WHY NOT WORKING?
useEvent("Escape", closeMenu);
</script>

<style lang="scss" scoped>
.ui-container {
  height: 100%;
  .ui-tabs {
    height: 64px;
    display: flex;
    flex-direction: row;
  }
  .activeTab {
    background-color: var(--elevation1) !important;
  }
  .ui-content {
    height: calc(100% - 64px);
    .inventory {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .skills {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
