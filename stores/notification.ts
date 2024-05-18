import { ulid } from "ulid";

export enum NotificationType {
  Drop = "Drop",
  Level = "Level",
  Game = "Game",
}

export type Notification = {
  id: string;
  type: NotificationType;
  text: string;
  closable: boolean;
  timeout: number;
};

export const useNotificationStore = defineStore("notification", () => {
  const dropNotifications = ref<Notification[]>([]);
  const gameNotifications = ref<Notification[]>([]);
  const levelNotifications = ref<Notification[]>([]);

  function showNotification(
    type: NotificationType,
    text: string,
    closable: boolean,
    timeout: number
  ) {
    console.log("Showing notification");
    const newNotification: Notification = {
      id: ulid(),
      type,
      text,
      closable,
      timeout,
    };
    if (type === NotificationType.Drop) {
      dropNotifications.value.push(newNotification);
      setTimeout(() => {
        dropNotifications.value = dropNotifications.value.filter(
          (e) => e.id !== newNotification.id
        );
      }, newNotification.timeout);
    }
    if (type === NotificationType.Game) {
      gameNotifications.value.push(newNotification);
      setTimeout(() => {
        gameNotifications.value = gameNotifications.value.filter(
          (e) => e.id !== newNotification.id
        );
      }, newNotification.timeout);
    }
    if (type === NotificationType.Level) {
      levelNotifications.value.push(newNotification);
      setTimeout(() => {
        levelNotifications.value = levelNotifications.value.filter(
          (e) => e.id !== newNotification.id
        );
      }, newNotification.timeout);
    }
  }

  return {
    dropNotifications,
    gameNotifications,
    levelNotifications,
    showNotification,
  };
});
