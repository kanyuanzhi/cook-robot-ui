<template>
  <q-item dense>
    <q-item-section avatar>分量</q-item-section>
    <q-item-section>
      <q-select
        dense
        options-dense
        filled
        v-model="weight"
        :options="weightOptions"
        options-cover
        stack-label
        label="分量"
      >
        <template v-slot:append>
          <span class="text-body2">克（毫升）</span>
        </template>
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["min", "max", "step"]);

const weight = ref(props.min);

const weightOptions = ref([]);
// eslint-disable-next-line vue/no-setup-props-destructure
for (let i = props.min; i < props.max + 1; i += props.step) {
  weightOptions.value.push(i);
}

watch(
  () => props.max,
  () => {
    weightOptions.value = [];
    for (let i = props.min; i < props.max + 1; i += props.step) {
      weightOptions.value.push(i);
    }
  });

const getWeight = () => {
  return weight.value;
};

const setWeight = (v) => {
  weight.value = v;
};

defineExpose({
  getWeight,
  setWeight
});
</script>

<style lang="scss" scoped>

</style>
