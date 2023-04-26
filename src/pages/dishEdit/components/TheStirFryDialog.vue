<template>
  <div>
    <q-dialog v-model="shown" persistent>
      <q-card style="width: 500px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加翻炒</div>
        </q-card-section>

        <GearSlider ref="gearSlider" label="档位" color="amber-10" :gear-min="0" :gear-max="5"/>

        <TimeSelect ref="timeSelect"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TimeSelect from "pages/dishEdit/components/TimeSelect";
import GearSlider from "pages/dishEdit/components/GearSlider";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const gearSlider = ref(null);
const timeSelect = ref(null);

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
  setTimeout(() => {
    if (step !== undefined) {
      isUpdate = true;
      stepIndex = index;
      gearSlider.value.setGear(step.gear);
      timeSelect.value.setTime(step.time);
    }
  }, 100);
};

const onSubmit = () => {
  try {
    const newStep = {
      name: "翻炒" + gearSlider.value.getGear() + "档",
      gear: gearSlider.value.getGear(),
      time: timeSelect.value.getTime(),
      key: Date.now(),
      type: "stir_fry"
    };
    if (isUpdate) {
      emits("update", newStep, stepIndex);
    } else {
      emits("submit", newStep);
    }
  } catch (e) {
    return;
  }
  shown.value = false;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
