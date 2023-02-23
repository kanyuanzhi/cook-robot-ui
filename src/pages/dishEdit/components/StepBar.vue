<template>
  <q-stepper
    v-model="stepName"
    ref="stepper"
    flat
    alternative-labels
    animated
  >
    <q-step
      v-for="step in stepsLine"
      :key="step.name + step.time"
      :name="step.name + step.time"
      icon="add"
      :title="step.name"
      :caption="secondsToMMSS(step.time)"
    />
  </q-stepper>
</template>

<script setup>
import {computed, ref} from "vue";
import {secondsToMMSS} from "src/utils/timeFormat";

const props = defineProps(["steps"])
const stepName = ref(1)

const stepsLine = computed(() => {
  const line = []
  for (const key in props.steps) {
    line.push(...props.steps[key])
  }
  return line.sort(sortBy("time", 1))
})

function sortBy(property, asc) {
  if (asc == undefined) {
    asc = -1
  } else {
    asc = asc ? -1 : 1
  }
  return function (value1, value2) {
    let a = value1[property]
    let b = value2[property]
    return a < b ? asc : a > b ? asc * -1 : 0
  }
}

</script>

<style lang="scss" scoped>
:deep(.q-stepper__content) {
  height: 0;
}
</style>
