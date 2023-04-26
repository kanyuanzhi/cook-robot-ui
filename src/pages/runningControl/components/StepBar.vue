<template>
  <q-scroll-area
    ref="scrollArea"
    :visible="false"
    :horizontal-thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
    style="height: 104px;">
    <q-stepper
      v-model="stepValue"
      ref="stepper"
      done-color="blue-8"
      done-icon="done"
      :active-color="activeColor"
      :active-icon="activeIcon"
      inactive-icon="more_horiz"
      inactive-color="blue-11"
      flat
      alternative-labels
      swipeable
      animated
    >
      <q-step
        v-for="(step, index) in stepsLine"
        :key="index" :title="step.name"
        :caption="secondsToMMSS(step.time)"
        :name="index"
        :done="stepValue > index"
      />
    </q-stepper>
  </q-scroll-area>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { sortBy } from "src/utils/array";
import { secondsToMMSS } from "src/utils/timeFormat";
import { UseRunningStore } from "stores/runningStore";

const props = defineProps(["isRunning", "steps", "runningTime"]);

const useRunningStore = UseRunningStore();
const stepValue = ref(useRunningStore.getStepValue);

const activeColor = computed(() => {
  return props.isRunning ? "green-6" : "green-6";
});
const activeIcon = computed(() => {
  return props.isRunning ? "play_arrow" : "pause";
});

const stepsLine = computed(() => {
  const line = [];
  for (const key in props.steps) {
    line.push(...props.steps[key]);
  }
  line.sort(sortBy("time", 1));
  return line;
});

const scrollArea = ref(null);
watch(
  () => props.runningTime,
  (newValue) => {
    const n = getCurrentStepNumber(newValue);
    stepValue.value = n;
    useRunningStore.setStepValue(stepValue.value);
    if (n > 2) {
      scrollArea.value.setScrollPosition("horizontal", (n - 3) * 120);
    }
    // for (let i = 0; i < stepsLine.value.length - 1; i++) {
    //   if (newValue >= stepsLine.value[i].time && newValue < stepsLine.value[i + 1].time) {
    //     if (stepValue.value > 2) {
    //       scrollArea.value.setScrollPosition("horizontal", (i - 3) * 120);
    //     }
    //     stepValue.value = i;
    //     useRunningStore.setStepValue(stepValue.value);
    //     break;
    //   }
    //   stepValue.value = i + 1;
    //   useRunningStore.setStepValue(stepValue.value);
    // }
  });

const getCurrentStepNumber = (runningTime) => {
  for (let i = 0; i < stepsLine.value.length - 1; i++) {
    if (runningTime >= stepsLine.value[i].time && runningTime < stepsLine.value[i + 1].time) {
      return i;
    }
  }
  return stepsLine.value.length - 1;
};

onMounted(() => {
  const n = getCurrentStepNumber(props.runningTime);
  // if (n > 2) {
  //   scrollArea.value.setScrollPosition("horizontal", (n - 3) * 120);
  // }

  setInterval(() => {
    if (n > 2) {
      // scrollArea.value.setScrollPosition("horizontal", (n - 3) * 120, 1000);
    }
  }, 3000);
});

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
  opacity: "0",
  // opacity: "0.75",
};
</script>

<style lang="scss" scoped>
:deep(.q-stepper__content) {
  height: 0;
}

//
:deep(.q-scrollarea__thumb--h) {
  height: 5px;
}

//
:deep(.q-stepper__title) {
  letter-spacing: 0;
}

//
:deep(.q-stepper__header) {
  flex-wrap: nowrap !important;
}

//
:deep(.q-stepper__header--alternative-labels .q-stepper__tab) {
  padding: 20px 32px;
  width: 118px;
}
</style>
