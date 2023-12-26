<template>
  <div>
    <div>saves page</div>
    <div class="test">
      <AButton text="Testi" />
      <AField label="Kenttä" />
      <AProgressCircular />
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });
</script>
<style lang="scss" scoped>
.test {
}
</style>
