<template>
  <div class="row no-wrap" :style="{height: height}">
    <div class="col-9 flex no-wrap">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div v-if="label.length <=2" class="row q-col-gutter-md items-center">
          <div class="col-6">
            <OptionalInput v-model="value1" :label="label[0]" :unit="unit[0]" :min="min[0]" :max="max[0]"
                           :step="step[0]"/>
          </div>
          <div class="col-6" v-if="label.length>=2">
            <OptionalInput v-model="value2" :label="label[1]" :unit="unit[1]" :min="min[1]" :max="max[1]"
                           :step="step[1]"/>
          </div>
        </div>
        <div v-else class="row q-col-gutter-md items-center">
          <div class="col-4">
            <OptionalInput v-model="value1" :label="label[0]" :unit="unit[0]" :min="min[0]" :max="max[0]"
                           :step="step[0]"/>
          </div>
          <div class="col-4">
            <OptionalInput v-model="value2" :label="label[1]" :unit="unit[1]" :min="min[1]" :max="max[1]"
                           :step="step[1]"/>
          </div>
          <div class="col-4">
            <OptionalInput v-model="value3" :label="label[2]" :unit="unit[2]" :min="min[2]" :max="max[2]"
                           :step="step[2]"/>
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" :label="btnLabel[0]" @click="onBtnClick('on')"/>
        <q-btn v-if="btnLabel.length===2" push color="accent" :label="btnLabel[1]" @click="onBtnClick('off')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import OptionalInput from "components/OptionalInput";
import { createPLCInstruction } from "pages/overallControl/components/command";
import { ref } from "vue";

// const props = defineProps(["type", "title", "label", "unit", "min", "max", "step", "btnLabel", "height"]);
const props = defineProps({
  type: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: "65px"
  },
  label: {
    type: Array,
    default: () => {
      return [];
    }
  },
  unit: {
    type: Array,
    default: () => {
      return [];
    }
  },
  min: {
    type: Array,
    default: () => {
      return [];
    }
  },
  max: {
    type: Array,
    default: () => {
      return [];
    }
  },
  step: {
    type: Array,
    default: () => {
      return [];
    }
  },
  btnLabel: {
    type: Array,
    default: () => {
      return [];
    }
  },
});
const emits = defineEmits(["run"]);

const value1 = ref(props.min[0]);
const value2 = ref(props.min[1]);
const value3 = ref(props.min[2]);

const onBtnClick = (action) => {
  let plcInstruction;
  if (["x", "y"].indexOf(props.type) > -1) {
    plcInstruction = createPLCInstruction(props.type, value1.value, action, []);
  } else if (["r", "liquid_pump", "solid_pump", "water_pump"].indexOf(props.type) > -1) {
    plcInstruction = createPLCInstruction(props.type, value1.value, action, [value2.value]);
  } else {
    plcInstruction = createPLCInstruction(props.type, 0, action, [value1.value, value2.value, value3.value]);
  }

  emits("run", plcInstruction);
};
</script>

<style lang="scss" scoped>

</style>
