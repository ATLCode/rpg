<template>
  <div class="world-container">
    <div class="world-map">
      <MapWorld />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.world-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.world-info {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
}
.locations {
  padding: 1rem;
}
.location-card {
  height: 100px;
  width: 30vw;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  &.active {
    font-weight: bold;
    background-color: var(--elevation1);
  }
  &.path {
    filter: drop-shadow(0 0 5px white);
  }
  .character {
    height: 50px;
  }
}
.world-map {
  height: 100%;
  width: 100%;
}
</style>
