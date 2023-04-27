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
      style="height: 300px"
    >
      <q-slide-item
        v-for="(step,index) in steps"
        :key="step.key"
        right-color="red"
        @left="onLeft(index)"
        @right="onRight(index)"
      >
        <template v-slot:right>
          <q-icon name="delete"/>
        </template>
        <q-item clickable @click="onClick(step, index)">
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
      <q-btn
        v-if="stepName==='ingredient'"
        dense
        class="q-ml-md"
        round
        @click="theIngredientWaterDialog.show()"
      >
        <q-icon name="water_drop" color="primary"></q-icon>
      </q-btn>
    </q-item-label>
    <TheIngredientDialog ref="theIngredientDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheIngredientWaterDialog ref="theIngredientWaterDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheSeasoningDialog ref="theSeasoningDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheFireDialog ref="theFireDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheStirFryDialog ref="theStirFryDialog" @submit="onSubmit" @update="onUpdate"/>
  </q-list>
</template>

<script setup>
import { computed, ref } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import { sortBy } from "src/utils/array";
import TheIngredientDialog from "pages/dishEdit/components/TheIngredientDialog";
import TheSeasoningDialog from "pages/dishEdit/components/TheSeasoningDialog";
import TheFireDialog from "pages/dishEdit/components/TheFireDialog";
import TheStirFryDialog from "pages/dishEdit/components/TheStirFryDialog";
import TheIngredientWaterDialog from "pages/dishEdit/components/TheIngredientWaterDialog";

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
      if (step.type === "water") {
        return `${secondsToMMSS(step.time)}，${step.name}，${step.weight}克(毫升)`;
      } else {
        return `${secondsToMMSS(step.time)}，${step.name}(${step.shape})，${step.weight}克，菜盒${step.slot}`;
      }
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

const onLeft = (index) => {
};
const onRight = (index) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.steps.splice(index, 1);
};

const theIngredientDialog = ref(null);
const theIngredientWaterDialog = ref(null);
const theSeasoningDialog = ref(null);
const theFireDialog = ref(null);
const theStirFryDialog = ref(null);

const onClick = (step, index) => {
  // console.log(step);
  switch (step.type) {
    case "ingredient":
      theIngredientDialog.value.show(step, index);
      return;
    case "water":
      theIngredientWaterDialog.value.show(step, index);
      return;
    case "seasoning":
      theSeasoningDialog.value.show(step, index);
      return;
    case "fire":
      theFireDialog.value.show(step, index);
      return;
    case "stir_fry":
      theStirFryDialog.value.show(step, index);
      return;
    default:
      return;
  }
};

const onDialogShowBtnClick = () => {
  switch (props.stepName) {
    case "ingredient":
      theIngredientDialog.value.show();
      return;
    case "seasoning":
      theSeasoningDialog.value.show();
      return;
    case "fire":
      theFireDialog.value.show();
      return;
    case "stir_fry":
      theStirFryDialog.value.show();
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

const onUpdate = (val, index) => {
  for (let key in val) {
    // eslint-disable-next-line vue/no-mutating-props
    props.steps[index][key] = val[key];
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.steps.sort(sortBy("time", 1));
};

const contentStyle = {
  // backgroundColor: "rgba(0,0,0,0.02)",
  backgroundColor: "white",
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
