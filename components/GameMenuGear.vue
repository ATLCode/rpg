<template>
  <div class="gear-container">
    Gear
    <div class="gear-grid">
      <div class="slot-head gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Head]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Head)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Head]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Head</div>
      </div>
      <div class="slot-neck gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Neck]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Neck)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Neck]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Neck</div>
      </div>
      <div class="slot-torso gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Torso]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Torso)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Torso]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Torso</div>
      </div>
      <div class="slot-legs gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Legs]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Legs)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Legs]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Legs</div>
      </div>
      <div class="slot-feet gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Feet]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Feet)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Feet]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Feet</div>
      </div>
      <div class="slot-mainhand gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.MainHand]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.MainHand)"
        >
          <img
            :src="playerStore.gear[EquipSlot.MainHand]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Mainhand</div>
      </div>
      <div class="slot-offhand gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.OffHand]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.OffHand)"
        >
          <img
            :src="playerStore.gear[EquipSlot.OffHand]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>OffHand</div>
      </div>
      <div class="slot-back gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Back]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Back)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Back]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Back</div>
      </div>
      <div class="slot-ammo gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Ammo]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Ammo)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Ammo]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Ammo</div>
      </div>
      <div class="slot-hands gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Hands]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Hands)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Hands]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Hands</div>
      </div>
      <div class="slot-fingers gear-slot">
        <div
          v-if="playerStore.gear[EquipSlot.Fingers]"
          @contextmenu.prevent="showItemActionsMenu($event, EquipSlot.Fingers)"
        >
          <img
            :src="playerStore.gear[EquipSlot.Fingers]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
        <div v-else>Fingers</div>
      </div>
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

<script setup lang="ts">
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
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px grey solid;
}
.gear-slot {
  border: 1px red solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gear-grid {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}

.overlay::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay:hover {
  cursor: pointer;
}
</style>
