<template>
  <div class="gear-container">
    <div class="slot-head">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Head]"
        :gear-item="playerStore.gear[EquipSlot.Head]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Head)"
      />
      <GameItem v-else :empty-slot-gear="'Head'" />
    </div>
    <div class="slot-neck">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Neck]"
        :gear-item="playerStore.gear[EquipSlot.Neck]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Neck)"
      />
      <GameItem v-else :empty-slot-gear="'Neck'" />
    </div>
    <div class="slot-torso">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Torso]"
        :gear-item="playerStore.gear[EquipSlot.Torso]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Torso)"
      />
      <GameItem v-else :empty-slot-gear="'Torso'" />
    </div>
    <div class="slot-legs">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Legs]"
        :gear-item="playerStore.gear[EquipSlot.Legs]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Legs)"
      />
      <GameItem v-else :empty-slot-gear="'Legs'" />
    </div>
    <div class="slot-feet">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Feet]"
        :gear-item="playerStore.gear[EquipSlot.Feet]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Feet)"
      />
      <GameItem v-else :empty-slot-gear="'Feet'" />
    </div>
    <div class="slot-mainhand">
      <GameItem
        v-if="playerStore.gear[EquipSlot.MainHand]"
        :gear-item="playerStore.gear[EquipSlot.MainHand]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.MainHand)"
      />
      <GameItem v-else :empty-slot-gear="'Mainhand'" />
    </div>
    <div class="slot-offhand">
      <GameItem
        v-if="playerStore.gear[EquipSlot.OffHand]"
        :gear-item="playerStore.gear[EquipSlot.OffHand]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.OffHand)"
      />
      <GameItem v-else :empty-slot-gear="'Offhand'" />
    </div>
    <div class="slot-back">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Back]"
        :gear-item="playerStore.gear[EquipSlot.Back]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Back)"
      />
      <GameItem v-else :empty-slot-gear="'Back'" />
    </div>
    <div class="slot-ammo">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Ammo]"
        :gear-item="playerStore.gear[EquipSlot.Ammo]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Ammo)"
      />
      <GameItem v-else :empty-slot-gear="'Ammo'" />
    </div>
    <div class="slot-hands">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Hands]"
        :gear-item="playerStore.gear[EquipSlot.Hands]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Hands)"
      />
      <GameItem v-else :empty-slot-gear="'Hands'" />
    </div>
    <div class="slot-fingers">
      <GameItem
        v-if="playerStore.gear[EquipSlot.Fingers]"
        :gear-item="playerStore.gear[EquipSlot.Fingers]?.item.img"
        @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Fingers)"
      />
      <GameItem v-else :empty-slot-gear="'Fingers'" />
    </div>
  </div>
  <div
    v-if="showItemActions"
    class="overlay"
    @click="closeItemActionsMenu"
  ></div>
  <ContextMenuItemActions
    v-if="showItemActions"
    :x="menuX"
    :y="menuY"
    :selected-item="selectedItem"
    :mode="ContextMode.Gear"
    @close="showItemActions = false"
  />
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import { ContextMode, EquipSlot } from "~/game/items";

const playerStore = usePlayerStore();

const selectedItem = ref<InventoryItem | null>(null);
const showItemActions = ref(false);
const menuX = ref(0);
const menuY = ref(0);

function showItemActionsMenu(event: any, equipSlot: EquipSlot) {
  selectedItem.value = playerStore.gear[equipSlot];
  event.preventDefault();
  showItemActions.value = true;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
}
function closeItemActionsMenu() {
  showItemActions.value = false;
}

// TODO Add pet / companion slots later
// Will there be utility slot for torch etc?
// Should there be toolbelt etc?
// Face slot? For mask, goggles etc?
// Pouch slot?
</script>

<style lang="scss" scoped>
.gear-container {
  height: fit-content;
  width: fit-content;
  display: grid;
  grid-template-columns: 70px 70px 70px 70px 70px;
  grid-template-rows: 70px 70px 70px 70px 70px;
  gap: 10px;

  grid-template-areas:
    ". . sHead . ."
    "sBack . sNeck . sAmmo"
    "sMainhand . sTorso . sOffhand"
    ". . sLegs . ."
    "sHands . sFeet . sFingers";
}
.slot-head {
  grid-area: sHead;
}
.slot-neck {
  grid-area: sNeck;
}
.slot-torso {
  grid-area: sTorso;
}
.slot-legs {
  grid-area: sLegs;
}
.slot-feet {
  grid-area: sFeet;
}
.slot-mainhand {
  grid-area: sMainhand;
}
.slot-offhand {
  grid-area: sOffhand;
}
.slot-back {
  grid-area: sBack;
}
.slot-ammo {
  grid-area: sAmmo;
}
.slot-hands {
  grid-area: sHands;
}
.slot-fingers {
  grid-area: sFingers;
}
</style>
