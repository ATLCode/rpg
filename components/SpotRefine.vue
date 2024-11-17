<template>
  <div class="crafting-container">
    <div class="abilities">
      <div
        v-for="(ability, index) in spotAbilities"
        :key="index"
        @click="selectAbility(ability)"
      >
        <div class="list-title"><h2>Abilities</h2></div>
        <div>{{ ability.name }}</div>
      </div>
    </div>
    <div class="img">
      <div v-if="spotStore.selectedAbility?.craftingDetails">
        {{ spotStore.selectedAbility.craftingDetails?.product.item.name }}
      </div>
      <div v-else>No ability selected</div>
    </div>
    <div v-if="spotStore.selectedAbility" class="description">
      <div>
        Description:{{
          spotStore.selectedAbility.craftingDetails?.product.item.name
        }}
      </div>
      <div>Energy Cost:{{ spotStore.selectedAbility.energyCost }}</div>
      <div>XP: {{ spotStore.selectedAbility.xp }}</div>
      <div>
        Ingredients:
        {{ spotStore.selectedAbility.craftingDetails?.ingredients }}
      </div>
    </div>
    <div class="actions">
      <AProgressLinear
        v-model="spotStore.currentActionProgress"
        :max="spotStore.currentActionLength"
        height="2.5rem"
        width="100%"
      />
      <AButton @click="craftItem">Cook</AButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSpotStore } from "@/stores/spot";
import { useSkillStore } from "@/stores/skill";
import type { Ability } from "~/types/ability.types";

const spotStore = useSpotStore();
const skillStore = useSkillStore();

const spotAbilities = computed(() => {
  if (!spotStore.selectedSpot) {
    return null;
  }
  return skillStore.playerAbilities.filter(
    (ability) => ability.skillId === spotStore.selectedSpot?.skillId
  );
});

function selectAbility(ability: Ability) {
  spotStore.selectAbility(ability);
}
function craftItem() {
  spotStore.startAction();
}
</script>

<style lang="scss" scoped>
.crafting-container {
  height: calc(100% - 59px);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-areas:
    "abilities img"
    "abilities description"
    "abilities actions";

  padding: 1rem;
}
.abilities {
  grid-area: abilities;
}
.img {
  grid-area: img;
}
.description {
  grid-area: description;
}
.actions {
  grid-area: actions;
}
.list-title {
  display: flex;
  justify-content: center;
}
</style>
