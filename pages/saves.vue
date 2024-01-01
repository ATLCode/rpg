<template>
  <div>
    <div class="test">saves page</div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });
</script>
<style lang="scss" scoped>
.test {
  font-family: "Rubik Doodle Triangles";
}
</style>
