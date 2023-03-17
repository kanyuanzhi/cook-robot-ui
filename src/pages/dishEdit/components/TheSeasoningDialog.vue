<template>
  <div>
    <q-dialog v-model="shown" persistent position="top">
      <q-card style="width: 400px" class="q-px-sm q-mt-md">
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
              @blur="onInputBlur($event, 'name')"
              @focus="onInputFocus($event, 'name')"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" @click="theSeasonNameSelectionDialog.show()"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <WeightSelect ref="weightSelect" :min="1" :max="200" :step="1"/>

        <q-item dense>
          <q-item-section avatar>调料盒</q-item-section>
          <q-item-section>
            <div class="q-pa-md">
              <div class="q-gutter-md">
                <q-radio
                  v-for="s in slots"
                  :key="s"
                  v-model="slot"
                  dense
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  :val="s"
                  :label="s"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>

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
    <TheSeasoningNameSelectionDialog ref="theSeasonNameSelectionDialog" @select="(val)=>name=val"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import TheSeasoningNameSelectionDialog from "pages/dishEdit/components/TheSeasoningNameSelectionDialog";
import TimeSelect from "pages/dishEdit/components/TimeSelect";
import WeightSelect from "pages/dishEdit/components/WeightSelect";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const show = () => {
  shown.value = true;
};

const slots = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const name = ref("");
const slot = ref("");

const weightSelect = ref(null);
const timeSelect = ref(null);

const inputNameToPara = {
  name,
  slot,
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

const theSeasonNameSelectionDialog = ref(null);

const onSubmit = () => {
  try {
    emits("submit", {
      name: name.value,
      weight: weightSelect.value.getWeight(),
      slot: slot.value,
      time: timeSelect.value.getTime(),
      key: Date.now(),
      type: "seasoning"
    });
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
