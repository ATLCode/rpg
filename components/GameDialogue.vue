<template>
  <div v-if="model && props.dialogue" class="dialogue-container" @click="next">
    <div v-if="isGameTurn" class="dialogue-npc">
      <div class="npc-text">
        <div>{{ currentNode?.text[gameTextIndex] }}</div>
      </div>
      <div class="npc-info">
        <div>{{ props.defaultName }}</div>

        <div class="info-img-container">
          <img :src="props.defaultImage" class="info-img" alt="image" />
        </div>
      </div>
      <div class="guide-text">Click to continue</div>
    </div>
    <div v-if="!isGameTurn" class="dialogue-player">
      <div class="player-info">
        <div class="info-img-container">
          <img src="/public/icons/21.png" class="info-img" alt="image" />
        </div>
      </div>

      <div class="player-choices">
        <div
          v-for="(playerChoice, index) in currentNode?.playerChoices"
          :key="index"
          class="player-choice"
          @click="handlePlayerChoice(playerChoice)"
        >
          {{ playerChoice.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { useCombatStore } from "@/stores/combat";
import {
  ChoiceType,
  type Dialogue,
  type DialogueNode,
  type PlayerChoice,
} from "~/types/dialogue.types";
import { CombatId, combats } from "~/game/combat";

const combatStore = useCombatStore();

const model = defineModel({ type: Boolean });

const props = defineProps({
  dialogue: {
    type: Object as PropType<Dialogue | null>,
    default: null,
  },
  defaultImage: {
    type: String,
    default: "",
  },
  defaultName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const currentNode = ref<DialogueNode | null>(null);
const isGameTurn = ref(true);
const gameTextIndex = ref(0);

function next() {
  if (!currentNode.value) {
    throw new Error("No current node");
  }
  if (!isGameTurn) {
    return;
  }
  if (gameTextIndex.value === currentNode.value.text.length - 1) {
    isGameTurn.value = false;
  } else {
    gameTextIndex.value += 1;
  }
}

function handlePlayerChoice(choice: PlayerChoice) {
  if (!props.dialogue) {
    throw new Error("No dialogue found");
  }
  if (choice.type === ChoiceType.EndDialog) {
    closeDialogue();
  }
  if (choice.type === ChoiceType.NodeId) {
    const newNode = props.dialogue.nodes.find(
      (node) => node.id === choice.target
    );
    if (newNode) {
      currentNode.value = newNode;
      isGameTurn.value = true;
      gameTextIndex.value = 0;
    } else {
      throw new Error("Can't find new node");
    }
  }
  if (choice.type === ChoiceType.CombatId) {
    combatStore.startCombat(combats[choice.target as CombatId]);
  }
}

function closeDialogue() {
  model.value = false;
  if (props.dialogue) {
    currentNode.value = props.dialogue.nodes[0];
  }
  isGameTurn.value = true;
  gameTextIndex.value = 0;
  emit("close");
}

onMounted(() => {
  if (props.dialogue) {
    currentNode.value = props.dialogue.nodes[0];
    gameTextIndex.value = 0;
  }
});
</script>

<style lang="scss" scoped>
.dialogue-container {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30%;
  z-index: 99999;
  background-color: var(--elevation1);
}
.dialogue-npc {
  height: 100%;
  width: 100%;
  // border: 1px solid yellow;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 1rem;
  cursor: pointer;
}
.dialogue-player {
  height: 100%;
  width: 100%;
  // border: 1px solid blue;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1rem;
  .player-choice {
    cursor: pointer;
  }
  .player-choice:hover {
    color: red;
  }
}
.npc-info,
.player-info {
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
.guide-text {
  display: flex;
  justify-content: center;
  font-style: italic;
}
</style>
