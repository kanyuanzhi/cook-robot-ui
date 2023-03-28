<template>
  <q-select
    dense
    options-dense
    filled
    :model-value="value"
    @update:model-value="(val) => emits('update:value', val)"
    :options="options"
    options-cover
    stack-label
    :label="formattedLabel"
  >
    <template v-slot:append>
      <span class="text-body2">{{ unit }}</span>
    </template>
  </q-select>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["label", "unit", "min", "max", "step", "value"]);

const emits = defineEmits(["update:value"]);

const formattedLabel = computed(() => {
  return props.label + "(" + (props.min === props.max ? props.min : props.min + "~" + props.max) + ")";
});

const options = [];
// eslint-disable-next-line vue/no-setup-props-destructure
for (let i = props.min; i < props.max + 1; i += props.step) {
  options.push(i);
}
</script>

<style lang="scss" scoped>

</style>
