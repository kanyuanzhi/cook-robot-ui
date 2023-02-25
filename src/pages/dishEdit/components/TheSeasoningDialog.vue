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

        <q-item dense>
          <q-item-section avatar>分量</q-item-section>
          <q-item-section>
            <q-input
              v-model="weight"
              filled
              dense
              @blur="onInputBlur($event, 'weight')"
              @focus="onInputFocus($event, 'weight')"
            >
              <template v-slot:append>
                <span class="text-body2">克</span>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

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

        <q-item dense>
          <q-item-section avatar>时刻</q-item-section>
          <q-item-section>
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  v-model.number="min"
                  filled
                  dense
                  @blur="onInputBlur($event, 'min')"
                  @focus="onInputFocus($event, 'min')"
                >
                  <template v-slot:append>
                    <span class="text-body2">分</span>
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-input
                  v-model.number="sec"
                  filled
                  dense
                  @blur="onInputBlur($event, 'sec')"
                  @focus="onInputFocus($event, 'sec')"
                >
                  <template v-slot:append>
                    <span class="text-body2">秒</span>
                  </template>
                </q-input>
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn v-close-popup flat color="primary" @click="onSubmit">提交</q-btn>
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
import { computed, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import TheIngredientNameSelectionDialog from "pages/dishEdit/components/TheIngredientNameSelectionDialog";
import TheIngredientShapeSelectionDialog from "pages/dishEdit/components/TheIngredientShapeSelectionDialog";
import TheSeasoningNameSelectionDialog from "pages/dishEdit/components/TheSeasoningNameSelectionDialog";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const show = () => {
  shown.value = true;
};

const slots = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const name = ref("");
const weight = ref("");
const slot = ref("");
const min = ref("");
const sec = ref("");
const time = computed(() => parseInt(
  min.value === "" ? "0" : min.value) * 60 + parseInt(sec.value === "" ? "0" : sec.value));

const inputNameToPara = {
  name,
  slot,
  weight,
  min,
  sec,
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
  shown.value = false;
  emits("submit", {
    name: name.value,
    weight: weight.value === "" ? 0 : parseInt(weight.value),
    slot: slot.value,
    time: time.value,
    key: Date.now(),
    type: "seasoning"
  });
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
