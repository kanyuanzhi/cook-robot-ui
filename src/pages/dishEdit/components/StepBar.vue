<template>
  <div class="row q-gutter-md">
    <div class="col-10">
      <q-scroll-area
        :horizontal-thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 115px; max-width: 100%;">
        <q-stepper v-model="stepName" :style="{width: autoWidth}" ref="stepper" flat alternative-labels animated>
          <q-step
            v-for="step in stepsLine"
            :key="step.name + step.time"
            :name="step.name + step.time"
            class="inline-block"
            :color="autoColor(step.type)"
            icon="add"
            :title="step.name"
            :caption="secondsToMMSS(step.time)"
          />
        </q-stepper>
      </q-scroll-area>
    </div>
    <div class="col-2"></div>
  </div>


</template>

<script setup>
import { computed, ref, watch } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import { sortBy } from "src/utils/array";

const props = defineProps(["steps"]);
const stepName = ref(1);

const stepsLine = computed(() => {
  const line = [];
  for (const key in props.steps) {
    line.push(...props.steps[key]);
  }
  return line.sort(sortBy("time", 1));
});

const autoWidth = ref(`${stepsLine.value.length * 120}px`);
watch(stepsLine, () => {
  autoWidth.value = `${stepsLine.value.length * 120}px`;
});

const autoColor = (type) => {
  switch (type) {
    case "ingredient":
      return "teal";
    case "seasoning":
      return "cyan-7";
    case "fire":
      return "red-14";
    case "stir_fry":
      return "amber-10";
    default:
      return "grey";
  }
};

const contentStyle = {
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

<style lang="scss" scoped>
:deep(.q-stepper__content) {
  height: 0;
}

:deep(.q-scrollarea__thumb--h) {
  height: 5px;
}
</style>
