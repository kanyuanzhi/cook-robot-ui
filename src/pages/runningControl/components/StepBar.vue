<template>
  <q-scroll-area
    ref="scrollArea"
    :visible="false"
    :horizontal-thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
    style="height: 104px;">
    <q-stepper
      v-model="stepNumber"
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
        v-for="(step, index) in sortedSteps"
        :key="index" :title="step.name"
        :caption="secondsToMMSS(step.time)"
        :name="index"
        :done="stepNumber > index"
      />
    </q-stepper>
  </q-scroll-area>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";

const props = defineProps(["isRunning", "currentStepNumber", "sortedSteps"]);

const activeColor = computed(() => {
  return props.isRunning ? "green-6" : "green-6";
});
const activeIcon = computed(() => {
  return props.isRunning ? "play_arrow" : "pause";
});

const stepNumber = ref(props.currentStepNumber);
const scrollArea = ref(null);
watch(
  () => props.currentStepNumber,
  (newValue) => {
    stepNumber.value = newValue;
    if (newValue > 2) {
      scrollArea.value.setScrollPosition("horizontal", (newValue - 3) * 120);
    }
    // for (let i = 0; i < sortedSteps.value.length - 1; i++) {
    //   if (newValue >= sortedSteps.value[i].time && newValue < sortedSteps.value[i + 1].time) {
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

onMounted(() => {
  if (stepNumber.value > 2) {
    scrollArea.value.setScrollPosition("horizontal", (stepNumber.value - 3) * 120);
  }

  // setInterval(() => {
  //   if (n > 2) {
  //     // scrollArea.value.setScrollPosition("horizontal", (n - 3) * 120, 1000);
  //   }
  // }, 3000);
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
