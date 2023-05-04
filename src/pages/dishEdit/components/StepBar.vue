<template>
  <div class="">
    <q-scroll-area
      visible
      :horizontal-thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      style="height: 104px; max-width: 100%; border: 1px solid rgba(0, 0, 0, 0.12)">
      <q-stepper v-model="stepName" ref="stepper" flat alternative-labels>
        <q-step
          v-for="step in stepsLine"
          :key="step.key"
          :name="step.name + step.time"
          :color="autoColor(step.type)"
          icon="add"
          :title="step.name"
          :caption="secondsToMMSS(step.time)"
        />
      </q-stepper>
    </q-scroll-area>
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
    if(key !== "finish"){
      line.push(...props.steps[key]);
    }
  }
  line.sort(sortBy("time", 1));
  const finish = props.steps["finish"][0]
  finish.time = line[line.length - 1].time + 10
  line.push(finish)
  return line
});

// const autoWidth = ref(`${stepsLine.value.length * 120}px`);
// watch(stepsLine, () => {
//   autoWidth.value = `${stepsLine.value.length * 120}px`;
// });

const autoColor = (type) => {
  switch (type) {
    case "ingredient":
      return "green";
    case "water":
      return "primary";
    case "seasoning":
      return "teal-7";
    case "fire":
      return "red-14";
    case "stir_fry":
      return "amber-10";
    default:
      return "deep-purple-9";
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

:deep(.q-stepper__title) {
  letter-spacing: 0;
}

:deep(.q-stepper__header) {
  flex-wrap: nowrap !important;
}

:deep(.q-stepper__header--alternative-labels .q-stepper__tab) {
  padding: 20px 32px;
}
</style>
