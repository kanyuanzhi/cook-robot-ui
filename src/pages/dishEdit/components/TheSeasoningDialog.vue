<template>
  <div>
    <q-dialog v-model="shown" persistent>
      <!--      <q-card style="width: 400px" class="q-px-sm q-mt-md">-->
      <q-card style="width: 400px" class="q-px-sm">
        <q-card-section>
          <div class="text-h6">添加调料</div>
        </q-card-section>
        <q-item dense>
          <q-item-section avatar>种类</q-item-section>
          <q-item-section>
            <q-input
              v-model="name"
              filled
              dense
            >
              <!--              @blur="onInputBlur($event, 'name')"-->
              <!--              @focus="onInputFocus($event, 'name')"-->
              <!--            >-->
              <template v-slot:after>
                <q-btn round dense flat icon="toc" @click="theSeasonNameSelectionDialog.show()"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <WeightSelect ref="weightSelect" :min="minWeight" :max="maxWeight" :step="weightStep"/>

        <!--        <SlotRadio ref="slotRadio" label="调料盒" :slot-count="8"/>-->

        <TimeSelect ref="timeSelect"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--    <q-dialog-->
    <!--      v-model="shown"-->
    <!--      persistent-->
    <!--      position="bottom"-->
    <!--      no-focus-->
    <!--      no-refocus-->
    <!--      seamless-->
    <!--      full-width-->
    <!--    >-->
    <!--      <CustomKeyboard ref="customKeyboard" @change="onChange" @enter="onSubmit"/>-->
    <!--    </q-dialog>-->
    <TheSeasoningNameSelectionDialog ref="theSeasonNameSelectionDialog" @select="onSeasoningNameSelect"/>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import TheSeasoningNameSelectionDialog from "pages/dishEdit/components/TheSeasoningNameSelectionDialog";
import TimeSelect from "pages/dishEdit/components/TimeSelect";
import WeightSelect from "pages/dishEdit/components/WeightSelect";
import SlotRadio from "pages/dishEdit/components/SlotRadio";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const name = ref("");
const slot = ref(0);
const weightSelect = ref(null);
const minWeight = ref(1);
const maxWeight = ref(10);
const weightStep = ref(1);
// const slotRadio = ref(null);
const timeSelect = ref(null);

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
  setTimeout(() => {
    if (step !== undefined) {
      isUpdate = true;
      stepIndex = index;
      name.value = step.name;
      slot.value = step.slot;
      weightSelect.value.setWeight(step.weight);
      // slotRadio.value.setSlot(step.slot);
      timeSelect.value.setTime(step.time);

      generateWeightSelectInfo(step.slot);
    }
  }, 100);
};

const onSeasoningNameSelect = (val) => {
  name.value = val.name;
  slot.value = val.slot;
  generateWeightSelectInfo(val.slot);
};

const generateWeightSelectInfo = (slot) => {
  if (slot === 1) {
    minWeight.value = 10;
    maxWeight.value = 150;
    weightStep.value = 10;
  } else if ([2, 3, 4, 5, 6].indexOf(slot) > -1) {
    minWeight.value = 1;
    maxWeight.value = 20;
    weightStep.value = 1;
  } else {
    minWeight.value = 1;
    maxWeight.value = 10;
    weightStep.value = 1;
  }
};

// const inputNameToPara = {
//   name,
// };
//
// const customKeyboard = ref(null);
// const onInputFocus = (e, inputName) => {
//   customKeyboard.value.setInputName(inputName);
//   customKeyboard.value.setInput(e.target.value, inputName);
// };
//
// const onInputBlur = (e, inputName) => {
// };
//
// const onChange = (input, inputName) => {
//   inputNameToPara[inputName].value = input;
// };

const theSeasonNameSelectionDialog = ref(null);

const onSubmit = () => {
  try {
    const newStep = {
      name: name.value,
      weight: weightSelect.value.getWeight(),
      // slot: slotRadio.value.getSlot(),
      slot: slot.value,
      time: timeSelect.value.getTime(),
      key: Date.now(),
      type: "seasoning"
    };
    if (isUpdate) {
      emits("update", newStep, stepIndex);
    } else {
      emits("submit", newStep);
    }
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
