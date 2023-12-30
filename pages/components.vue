<template>
  <div>
    <div>Components Page</div>

    <AField v-model="msg" label="Kenttä" />
    {{ msg }}
    <AProgressCircular />
    <AButton @click="progress += 1">+1 Progress</AButton>
    <AProgressLinear v-model="progress" />
    <AButton @click="dialog = !dialog">Open Dialog</AButton>
    <ADialog v-model="dialog">Test</ADialog>
    <ASelect
      v-model="selectedItem"
      :items="items"
      item-title="name"
      item-value="code"
    />
    {{ selectedItem }}
    <AButton @click="notification = true">New Notification</AButton>
    <ANotification v-model="notification">Test</ANotification>
    <ACard class="testCard" title="Test Title"></ACard>
  </div>
</template>
<script lang="ts" setup>
const msg = ref("");
const progress = ref(0);
const dialog = ref(false);
const selectedItem = ref();
const items = ref([
  {
    code: "FI",
    name: "Finland",
  },
  {
    code: "SE",
    name: "Sweden",
  },
  {
    code: "NO",
    name: "Norway",
  },
  {
    code: "IT",
    name: "Italy",
  },
]);
// const items2 = ref(["Volvo", "Toyota", "Audi"]);
const notification = ref(false);
</script>
<style lang="scss" scoped>
.testCard {
  height: 200px;
  width: 200px;
}
</style>
