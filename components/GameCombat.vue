<template>
  <div class="combat-container">
    <div class="combat-visual">
      <div class="unit-card">
        <div class="img-container">
          <img src="/icons/21.png" class="unit-img" alt="" />
        </div>
        <AProgressLinear v-model="playerHp" color="var(--error)" />
      </div>
      <ASpacer />
      <div class="unit-card">
        <div class="img-container">
          <img src="/npcs/27.png" class="unit-img" alt="" />
        </div>
        <AProgressLinear v-model="enemyHp" color="var(--error)" />
      </div>
    </div>
    <div class="combat-info">
      <div class="info-player">
        <div class="player-tabs">
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Equipment }"
            @click="selectedPlayerView = PlayerView.Equipment"
            >EQ</AButton
          >
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Inventory }"
            @click="selectedPlayerView = PlayerView.Inventory"
            >IN</AButton
          >
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Abilities }"
            @click="selectedPlayerView = PlayerView.Abilities"
            >AB</AButton
          >
          <AButton
            background-color="--elevation1"
            :class="{ activeTab: selectedPlayerView === PlayerView.Stats }"
            @click="selectedPlayerView = PlayerView.Stats"
            >ST</AButton
          >
        </div>
        <div class="player-view">
          <div
            v-if="selectedPlayerView === PlayerView.Equipment"
            class="tab-content"
          >
            <GameMenuGear />
          </div>
          <div
            v-if="selectedPlayerView === PlayerView.Inventory"
            class="tab-content"
          >
            <GameMenuInventory />
          </div>
          <div
            v-if="selectedPlayerView === PlayerView.Abilities"
            class="tab-content"
          >
            <GameMenuAbilities />
          </div>
          <div
            v-if="selectedPlayerView === PlayerView.Stats"
            class="tab-content"
          >
            <GameMenuSkills />
          </div>
        </div>
      </div>
      <div class="info-middle">Middle</div>
      <div class="info-enemy">Enemy</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
enum PlayerView {
  Equipment = "Equipment",
  Inventory = "Inventory",
  Abilities = "Abilities",
  Stats = "Stats",
}

const selectedPlayerView = ref(PlayerView.Abilities);

const playerHp = ref(100);
const enemyHp = ref(100);
</script>
<style lang="scss" scoped>
.combat-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr;
}

.combat-visual {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  .unit-card {
    align-self: center;
    border: 1px solid var(--elevation2);
    height: 200px;
    width: 150px;
  }
  .unit-img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

.combat-info {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  .info-player {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    .player-tabs {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
    }
    .player-view {
      height: 100%;
      .tab-content {
        height: 100%;
        width: 100%;
      }
    }
  }
}

.activeTab {
  border: 2px var(--elevation4) solid;
}
</style>
