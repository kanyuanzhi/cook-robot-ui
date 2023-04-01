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
      <q-btn-group rounded>
        <q-btn push color="primary" :label="btnLabel[0]" :disabled="disable" @click="onBtnClick('on')"/>
        <q-btn v-if="btnLabel.length===2" push color="white" text-color="primary" :label="btnLabel[1]"
               :disabled="disable" @click="onBtnClick('off')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import OptionalInput from "components/OptionalInput";
import { createPLCInstruction, createSingleInstruction } from "pages/overallControl/components/command";
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
    default: "75px"
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
  disable: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["run"]);

const value1 = ref(props.min[0]);
const value2 = ref(props.min[1]);
const value3 = ref(props.min[2]);

const onBtnClick = (action) => {
  let instruction;
  if (["x", "y"].indexOf(props.type) > -1) {
    instruction = createPLCInstruction(props.type, value1.value, action, []);
  } else if (["r", "liquid_pump", "solid_pump", "water_pump"].indexOf(props.type) > -1) {
    instruction = createPLCInstruction(props.type, value1.value, action, [value2.value]);
  } else if (["shake", "temperature", "setting_x", "setting_y",
    "setting_r", "setting_shake", "setting_temperature"].indexOf(props.type) > -1) {
    instruction = createPLCInstruction(props.type, 0, action, [value1.value, value2.value, value3.value]);
  } else if (["ingredient"].indexOf(props.type) > -1) {
    instruction = createSingleInstruction(props.type, value1.value, action, 0, 0);
  } else if (["water", "fire", "stir_fry"].indexOf(props.type) > -1) {
    instruction = createSingleInstruction(props.type, 0, action, value1.value, 0);
  } else if (["seasoning"].indexOf(props.type) > -1) {
    instruction = createSingleInstruction(props.type, value1.value, action, value2.value, 0);
  }

  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
