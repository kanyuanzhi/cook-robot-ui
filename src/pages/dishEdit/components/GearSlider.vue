<template>
  <q-item dense>
    <q-item-section avatar>{{ label }}</q-item-section>
    <q-item-section>
      <q-slider
        v-model="gear"
        :color="color"
        marker-labels
        markers
        :min="gearMin"
        :max="gearMax"
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["label", "gearMin", "gearMax", "color"]);

const gear = ref(0);

const getGear = () => {
  return gear.value;
};

const setGear = (v) => {
  gear.value = v;
};

defineExpose({
  getGear,
  setGear
});
</script>

<style lang="scss" scoped>

</style>
