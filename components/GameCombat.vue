<template>
  <div class="combat-container">
    <div class="combat-visual">
      {{ selectedPlayerView }}
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
  Equipment,
  Abilities,
  Stats,
}

const selectedPlayerView = ref(PlayerView.Equipment);
</script>
<style lang="scss" scoped>
.combat-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr;
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
