<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    done-color="green"
    done-icon="done"
    :active-color="activeColor"
    :active-icon="activeIcon"
    inactive-icon="more_horiz"
    flat
    swipeable
    alternative-labels
    animated
  >
    <q-step :name="1" title="step1" caption="4:30" :done="step > 1"> </q-step>

    <q-step :name="2" title="step2" caption="6:30" :done="step > 2"> </q-step>

    <q-step :name="3" title="step3" caption="7:30" :done="step > 3"> </q-step>

    <q-step :name="4" caption="10:30" title="step4"> </q-step>
  </q-stepper>
</template>

<script setup>
import { computed, ref } from "vue";

const step = ref(2);

const props = defineProps(["isRunning"]);
const activeColor = computed(() => {
  return props.isRunning ? "green" : "orange";
});
const activeIcon = computed(() => {
  return props.isRunning ? "play_arrow" : "pause";
});
</script>

<style lang="scss" scoped>
:deep(.q-stepper__step-inner) {
  padding: 0;
}

:deep(.q-stepper__dot) {
  width: 25px;
  height: 25px;
  font-size: 17px;
}
</style>
