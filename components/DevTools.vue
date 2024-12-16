<template>
  <div class="dev-container">
    <AButton @click="worldStore.sleep(100)">Test Sleep</AButton>
    <AButton @click="saveStore.updateSave()">Test Save</AButton>
    <AButton @click="testFunction">Test Function</AButton>
  </div>
</template>

<script lang="ts" setup>
import { useSaveStore } from "@/stores/save";
import { useWorldStore } from "@/stores/world";
// import { useLocationStore } from "@/stores/location";
// import { useItemStore } from "@/stores/item";

const saveStore = useSaveStore();
const worldStore = useWorldStore();
// const locationStore = useLocationStore();
// const itemStore = useItemStore();

function testFunction() {}
</script>

<style lang="scss" scoped>
.dev-container {
  height: calc(100% - 59px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
