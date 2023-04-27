<template>
  <div>
    <q-dialog v-model="shown" persistent position="top">
      <q-card style="width: 400px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加食材</div>
        </q-card-section>
        <q-item dense>
          <q-item-section avatar>种类</q-item-section>
          <q-item-section>
            <q-input
              v-model="name"
              filled
              dense
              @blur="onInputBlur($event, 'name')"
              @focus="onInputFocus($event, 'name')"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" @click="theIngredientNameSelectionDialog.show()"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section avatar>形状</q-item-section>
          <q-item-section>
            <q-input
              v-model="shape"
              filled
              dense
              @blur="onInputBlur($event, 'shape')"
              @focus="onInputFocus($event, 'shape')"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" @click="theIngredientShapeSelectionDialog.show()"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <WeightSelect ref="weightSelect" :min="10" :max="1000" :step="10"/>

        <SlotRadio ref="slotRadio" label="菜盒" :slot-count="4"/>

        <TimeSelect ref="timeSelect"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="shown"
      persistent
      position="bottom"
      no-focus
      no-refocus
      seamless
      full-width
    >
      <CustomKeyboard ref="customKeyboard" @change="onChange" @enter="onSubmit"/>
    </q-dialog>
    <TheIngredientNameSelectionDialog ref="theIngredientNameSelectionDialog" @select="(val)=>name=val"/>
    <TheIngredientShapeSelectionDialog ref="theIngredientShapeSelectionDialog" @select="(val)=>shape=val"/>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import TheIngredientNameSelectionDialog from "pages/dishEdit/components/TheIngredientNameSelectionDialog";
import TheIngredientShapeSelectionDialog from "pages/dishEdit/components/TheIngredientShapeSelectionDialog";
import TimeSelect from "pages/dishEdit/components/TimeSelect";
import WeightSelect from "pages/dishEdit/components/WeightSelect";
import SlotRadio from "pages/dishEdit/components/SlotRadio";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const name = ref("");
const shape = ref("");
const weightSelect = ref(null);
const slotRadio = ref(null);
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
      shape.value = step.shape;
      weightSelect.value.setWeight(step.weight);
      slotRadio.value.setSlot(step.slot);
      timeSelect.value.setTime(step.time);
    }
  }, 100);
};

const inputNameToPara = {
  name,
  shape,
};

const customKeyboard = ref(null);
const onInputFocus = (e, inputName) => {
  customKeyboard.value.setInputName(inputName);
  customKeyboard.value.setInput(e.target.value, inputName);
};

const onInputBlur = (e, inputName) => {
};

const onChange = (input, inputName) => {
  inputNameToPara[inputName].value = input;
};

const theIngredientNameSelectionDialog = ref(null);
const theIngredientShapeSelectionDialog = ref(null);

const onSubmit = () => {
  try {
    const newStep = {
      name: name.value,
      shape: shape.value,
      weight: weightSelect.value.getWeight(),
      slot: slotRadio.value.getSlot(),
      time: timeSelect.value.getTime(),
      key: Date.now(),
      type: "ingredient"
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
