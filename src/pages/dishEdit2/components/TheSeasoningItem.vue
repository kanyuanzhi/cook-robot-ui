<template>
  <div class="row">
    <TheSeasoningSelect class="col" ref="theSeasoningSelect" :seasoning="seasoning" @update="onSeasoningUpdate"/>
    <NumberSelect class="col" label="分量" unit="克" :number="seasoning.weight" :min="minWeight" :max="maxWeight" :step="weightStep"
                  @update="onWeightUpdate"/>
    <q-btn size="xs" flat icon="clear" text-color="grey-8" @click="emits('delete')"></q-btn>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import TheSeasoningSelect from "pages/dishEdit2/components/select/TheSeasoningSelect.vue";
import NumberSelect from "pages/dishEdit2/components/select/NumberSelect.vue";

const props = defineProps(["seasoning"]);
const emits = defineEmits(["delete"]);

onMounted(() => {
  // setSeasoning(props.seasoning);
  generateWeightSelectInfo(props.seasoning.pump);
});

const minWeight = ref(1);
const maxWeight = ref(10);
const weightStep = ref(1);

const generateWeightSelectInfo = (slot) => {
  if ([1, 2, 3, 4, 5, 6].indexOf(slot) > -1) {
    minWeight.value = 1;
    maxWeight.value = 20;
    weightStep.value = 1;
  } else if ([7, 8].indexOf(slot) > -1) {
    minWeight.value = 10;
    maxWeight.value = 150;
    weightStep.value = 10;
  } else {
    minWeight.value = 1;
    maxWeight.value = 10;
    weightStep.value = 1;
  }
};

const onSeasoningUpdate = (val) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.label = val.label;
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.pump = val.pump;
  generateWeightSelectInfo(val.pump);
};

const onWeightUpdate = (val) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.seasoning.weight = val;
};
</script>

<style lang="scss" scoped></style>
