<template>
  <div class="gear-container">
    <div class="slot-head">
      <GameItem :equip-slot="EquipSlot.Head" />
    </div>
    <div class="slot-neck">
      <GameItem :equip-slot="EquipSlot.Neck" />
    </div>
    <div class="slot-torso">
      <GameItem :equip-slot="EquipSlot.Torso" />
    </div>
    <div class="slot-legs">
      <GameItem :equip-slot="EquipSlot.Legs" />
    </div>
    <div class="slot-feet">
      <GameItem :equip-slot="EquipSlot.Feet" />
    </div>
    <div class="slot-mainhand">
      <GameItem :equip-slot="EquipSlot.MainHand" />
    </div>
    <div class="slot-offhand">
      <GameItem :equip-slot="EquipSlot.OffHand" />
    </div>
    <div class="slot-back">
      <GameItem :equip-slot="EquipSlot.Back" />
    </div>
    <div class="slot-ammo">
      <GameItem :equip-slot="EquipSlot.Ammo" />
    </div>
    <div class="slot-hands">
      <GameItem :equip-slot="EquipSlot.Hands" />
    </div>
    <div class="slot-fingers">
      <GameItem :equip-slot="EquipSlot.Fingers" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EquipSlot } from "../types/item.types";

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
