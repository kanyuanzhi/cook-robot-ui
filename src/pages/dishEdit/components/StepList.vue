<template>
  <q-list bordered separator>
    <q-item-label header class="flex flex-center">{{
        stepDisplayName
      }}
    </q-item-label>
    <q-separator/>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      style="height: 280px"
    >
      <q-slide-item
        v-for="step in steps"
        :key="step.name"
        @left="onLeft"
        @right="onRight"
      >
        <template>
          <q-icon name="delete"/>
        </template>
        <q-item>
          <q-item-section>
            {{ listItemDisplayName(step) }}
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-scroll-area>
    <q-separator/>
    <q-item-label header class="flex flex-center q-py-sm">
      <q-btn
        dense
        icon="add"
        class=""
        round
        @click="onDialogShowBtnClick"
      />
    </q-item-label>
    <TheIngredientDialog ref="theIngredientDialog" @submit="onSubmit"/>
    <TheSeasoningDialog ref="theSeasoningDialog" @submit="onSubmit"/>
  </q-list>
</template>

<script setup>
import { computed, ref } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import { sortBy } from "src/utils/array";
import TheIngredientDialog from "pages/dishEdit/components/TheIngredientDialog";
import TheSeasoningDialog from "pages/dishEdit/components/TheSeasoningDialog";

const props = defineProps(["stepName", "steps"]);

const stepDisplayName = computed(() => {
  switch (props.stepName) {
    case "ingredient":
      return "食材";
    case "seasoning":
      return "调料";
    case "fire":
      return "火力";
    case "stir_fry":
      return "翻炒";
    default:
      return "ERROR";
  }
});

const listItemDisplayName = (step) => {
  switch (props.stepName) {
    case "ingredient":
      return `${secondsToMMSS(step.time)}，${step.name}(${step.shape})，${step.weight}克，菜盒${step.slot}`;
    case "seasoning":
      return `${secondsToMMSS(step.time)}，${step.name}，${step.weight}克，调料盒${step.slot}`;
    case "fire":
      return `${secondsToMMSS(step.time)}，${step.name}`;
    case "stir_fry":
      return `${secondsToMMSS(step.time)}，${step.name}`;
    default:
      return "ERROR";
  }
};

const onLeft = () => {
};
const onRight = () => {
};

const theIngredientDialog = ref(null);
const theSeasoningDialog = ref(null);

const onDialogShowBtnClick = () => {
  switch (props.stepName) {
    case "ingredient":
      theIngredientDialog.value.show();
      return;
    case "seasoning":
      theSeasoningDialog.value.show();
      return;
    case "fire":
      return;
    case "stir_fry":
      return;
    default:
      return;
  }
};

const onSubmit = (val) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.steps.push(val);
  // eslint-disable-next-line vue/no-mutating-props
  props.steps.sort(sortBy("time", 1));
};

const contentStyle = {
  backgroundColor: "rgba(0,0,0,0.02)",
  color: "#555",
};

const contentActiveStyle = {
  backgroundColor: "#eee",
  color: "black",
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
};
</script>

<style lang="scss" scoped></style>
