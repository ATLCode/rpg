<template>
  <div class="components">
    <div class="navigation">
      <li>
        <AButton
          background-color="transparent"
          @click="showComponents = !showComponents"
          >Components</AButton
        >
        <div v-if="showComponents">
          <ol>
            <li v-for="category in components" :key="category.name">
              <span class="nav-category">{{ category.name }}</span>
              <div>
                <ol>
                  <li v-for="component in category.content" :key="component">
                    <div class="nav-component" @click="selectPage(component)">
                      {{ component }}
                    </div>
                  </li>
                </ol>
              </div>
            </li>
          </ol>
        </div>
      </li>
    </div>
    <div class="content">
      <AButtonDocumentation v-show="selectedPage === 'Button'" />
      <ACardDocumentation v-show="selectedPage === 'Card'" />
      <AFieldDocumentation v-show="selectedPage === 'Field'" />
      <ADialogDocumentation v-show="selectedPage === 'Dialog'" />
      <ACheckboxDocumentation v-show="selectedPage === 'Checkbox'" />
      <ADividerDocumentation v-show="selectedPage === 'Divider'" />
      <ATooltipDocumentation v-show="selectedPage === 'Tooltip'" />
      <ANotificationDocumentation v-show="selectedPage === 'Notification'" />
      <ASelectDocumentation v-show="selectedPage === 'Select'" />
      <ASliderDocumentation v-show="selectedPage === 'Slider'" />
      <ASearchDocumentation v-show="selectedPage === 'Search'" />
      <ASwitchDocumentation v-show="selectedPage === 'Switch'" />
      <ATabsDocumentation v-show="selectedPage === 'Tabs'" />
      <ASpacerDocumentation v-show="selectedPage === 'Spacer'" />
    </div>

    <!--

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
    <div class="colorsTest"></div>
        -->
  </div>
</template>
<script lang="ts" setup>
const showComponents = ref(true);

const components = {
  containment: {
    name: "Containment",
    content: {
      button: "Button",
      card: "Card",
      tooltip: "Tooltip",
      divider: "Divider",
      spacer: "Spacer",
    },
  },
  data: { name: "Data", content: {} },
  feedback: { name: "Feedback", content: { notification: "Notification" } },
  form: {
    name: "Form",
    content: {
      checkbox: "Checkbox",
      field: "Field",
      select: "Select",
      search: "Search",
      slider: "Slider",
      switch: "Switch",
    },
  },
  menu: { name: "Menu", content: { tabs: "Tabs" } },
  media: { name: "Media", content: {} },
  misc: { name: "Misc", content: {} },
  overlay: { name: "Overlay", content: { dialog: "Dialog" } },
  text: { name: "Text", content: { subtitle: "Subtitle", title: "Title" } },
};

// Page Selection
const selectedPage = ref("Button");
function selectPage(component: string) {
  selectedPage.value = component;
}
</script>
<style lang="scss" scoped>
.components {
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 1rem;
  color: var(--text);
  font-family: "Inter var", sans-serif;

  .navigation {
    display: flex;
    flex-direction: column;
    margin-right: 4rem;
    flex-basis: 250px;
    overflow: auto;
    position: sticky;
    li {
      list-style: none;
    }
    .nav-category {
      display: flex;
      padding: 0.5rem;
    }
    .nav-component {
      display: flex;
      border-left: 1px solid var(--border);
      padding: 0.5rem;
      text-decoration: none;
      color: var(--text);
      font-weight: 450;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        border-left-color: var(--success);
        color: var(--success);
      }
    }
  }
}
.testCard {
  height: 200px;
  width: 200px;
}
.colorsTest {
  height: 200px;
  width: 200px;
}

/* width */
.components::-webkit-scrollbar {
  width: 30px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
