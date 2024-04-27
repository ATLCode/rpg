<template>
  <div class="world-map-container">
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :crs="crs"
      :center="[height / 2, width / 2]"
      :minZoom="-1"
      :maxZoom="1"
    >
      <l-image-overlay
        :url="imageOverlayUrl"
        :bounds="bounds"
      ></l-image-overlay>

      <l-marker :lat-lng="[1350, 1880]">
        <l-popup>Village</l-popup>
      </l-marker>
      <!--
         <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
     
      <l-marker
        v-for="(marker, idx) in markers"
        :key="idx"
        :lat-lng="marker.coordinates"
        ><l-popup>{{ idx }}</l-popup></l-marker
      >

      -->
    </LMap>
  </div>
</template>

<script lang="ts" setup>
import { CRS } from "leaflet";

// https://vue2-leaflet.netlify.app/examples/crs-and-image-overlay.html
// https://leafletjs.com/examples/crs-simple/crs-simple.html
// Not sure why I can't get local image to show up something wrong with url file path thing?

const imageOverlayUrl = ref(
  "https://inkarnate-api-as-production.s3.amazonaws.com/l3y57iyuu2tg7y9m9hzw76t9lmas"
);
const crs = CRS.Simple;
const width = ref(4000);
const height = ref(3000);
const zoom = ref(0);
const bounds = computed(
  () =>
    [
      [0, 0],
      [height.value, width.value],
    ] as L.LatLngBoundsLiteral
);
</script>
<style lang="scss" scoped>
.world-map-container {
  height: 100%;
  width: 100%;
  background-color: red;
}
</style>
