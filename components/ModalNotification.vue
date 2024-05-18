<template>
  <div
    v-for="notification in notificationStore.dropNotifications"
    :key="notification.id"
    class="drop-container"
  >
    {{ notification.text }}
  </div>
  <div
    v-for="notification in notificationStore.gameNotifications"
    :key="notification.id"
    class="game-container"
  >
    {{ notification.text }}
  </div>
  <div
    v-for="notification in notificationStore.levelNotifications"
    :key="notification.id"
    class="level-container"
  >
    {{ notification.text }}
  </div>
</template>

<script lang="ts" setup>
import { useNotificationStore } from "@/stores/notification";

const notificationStore = useNotificationStore();
/*
    v-for="notification in notificationStore.gameNotifications"
    :key="notification.id"
*/
</script>
<style lang="scss" scoped>
.drop-container {
  position: absolute;
  right: 0.5rem;
  top: 4rem;
  z-index: 9999;
  width: fit-content;
  background-color: var(--elevation1);
  border: 1px solid var(--elevation2);
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  z-index: 1000;
}
.game-container {
  position: absolute;
  right: 0px;
  left: 0px;
  margin-right: auto;
  margin-left: auto;
  top: 0.5rem;
  width: fit-content;
  background-color: var(--elevation1);
  border: 1px solid var(--elevation2);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  z-index: 1000;
}

.level-container {
  position: absolute;
  right: 0px;
  left: 0px;
  margin-right: auto;
  margin-left: auto;
  top: 0.5rem;
  width: fit-content;
  background-color: var(--elevation1);
  border: 1px solid var(--elevation2);
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  z-index: 1000;
}
</style>
