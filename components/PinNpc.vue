<template>
  <GameDialogue
    v-if="dialogue && model"
    v-model="model"
    :dialogue="dialogue"
    :default-image="npc?.img"
  />
</template>

<script lang="ts" setup>
import { pins } from "~/game/locations";
import { useLocationStore } from "@/stores/location";
import { PinType } from "~/types/location.types";
import { dialogues } from "~/game/dialogue";
import { NpcId, npcs } from "~/game/npcs";

const model = defineModel({ type: Boolean });

const locationStore = useLocationStore();

const npc = computed(() => {
  const pin = pins[locationStore.playerLocation.pinId];
  if (pin.type === PinType.Npc) {
    return npcs[pin.target as NpcId];
  }
  return null;
});

const dialogue = computed(() => {
  if (npc.value) {
    return dialogues[npc.value.dialogueId];
  } else {
    return null;
  }
});
</script>

<style lang="scss" scoped>
.npc-container {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30%;
  border: 1px solid red;
  z-index: 999;
  background-color: var(--elevation1);
}
.dialogue-npc {
  height: 100%;
  width: 100%;
  border: 1px solid yellow;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 1rem;
}
.npc-info {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}
.info-img-container {
  height: 100%;
}
.info-img {
  max-height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
