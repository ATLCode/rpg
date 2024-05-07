<template>
  <div class="gear-container">
    Gear
    <div class="gear-grid">
      <div class="slot-head gear-slot">head</div>
      <div class="slot-neck gear-slot">neck</div>
      <div class="slot-torso gear-slot">torso</div>
      <div class="slot-legs gear-slot">legs</div>
      <div class="slot-feet gear-slot">feet</div>
      <div class="slot-mainhand gear-slot">mainhand</div>
      <div class="slot-offhand gear-slot">offhand</div>
      <div class="slot-back gear-slot">back</div>
      <div class="slot-ammo gear-slot">ammo</div>
      <div class="slot-hands gear-slot">hands</div>
      <div class="slot-fingers gear-slot">fingers</div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  border: 1px grey solid;
}
.gear-slot {
  border: 1px red solid;
}
.gear-grid {
  height: 100%;
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
</style>
