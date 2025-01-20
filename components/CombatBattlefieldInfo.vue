<template>
  <div class="info-container">
    <AButton
      border-radius="0px"
      background-color="var(--elevation1)"
      @click="extendedInfoOpen = !extendedInfoOpen"
      >Battlefield</AButton
    >
    <div v-if="extendedInfoOpen" class="extended-info">
      <div v-if="combatStore.combatState">
        <h3>Turn Order</h3>
        <div
          v-for="(unit, index) in combatStore.combatState.turnOrder"
          :key="index"
          :class="{ 'current-unit': combatStore.currentTurnUnit === unit }"
        >
          {{ unit.name }}
        </div>
        <div>turnindex:{{ combatStore.combatState.currentTurnIndex }}</div>
        <div>
          turnOrderLength: {{ combatStore.combatState.turnOrder.length }}
        </div>

        <AButton @click="combatStore.endTurn">End Turn</AButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCombatStore } from "@/stores/combat";

const extendedInfoOpen = ref(false);
const combatStore = useCombatStore();
</script>

<style lang="scss" scoped>
.info-container {
  width: 300px;
  display: flex;
  flex-direction: column;
}
.extended-info {
  height: 300px;
  width: 300px;
  background-color: var(--elevation2);
  padding: 1rem;
}
.current-unit {
  color: red;
}
</style>
