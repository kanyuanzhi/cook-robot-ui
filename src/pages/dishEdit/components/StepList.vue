<template>
  <q-list bordered separator>
    <q-item-label header class="flex flex-center">{{
      stepDisplayName
    }}</q-item-label>
    <q-separator />
    <q-scroll-area
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      style="height: 300px"
    >
      <q-slide-item
        v-for="step in steps"
        :key="step.name"
        @left="onLeft"
        @right="onRight"
      >
        <template>
          <q-icon name="delete" />
        </template>
        <q-item>
          <q-item-section>
            {{
              `${secondsToMMSS(step.time)}，${step.name}(${step.shape})，${
                step.weight
              }克，槽位${step.slot} `
            }}
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-scroll-area>
    <q-separator />
    <q-item-label header class="flex flex-center q-py-sm">
      <q-btn
        dense
        icon="add"
        class=""
        round
        @click="ingredientDialog.shown = true"
      />
    </q-item-label>
    <IngredientDialog ref="ingredientDialog" />
  </q-list>
</template>

<script setup>
import { computed, ref } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import IngredientDialog from "pages/dishEdit/components/IngredientDialog";

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

const onLeft = () => {};
const onRight = () => {};

const ingredientDialog = ref(null);

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
