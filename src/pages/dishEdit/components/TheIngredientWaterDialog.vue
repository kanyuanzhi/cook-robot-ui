<template>
  <div>
    <q-dialog v-model="shown" persistent position="top">
      <q-card style="width: 400px; margin-top: 100px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加水</div>
        </q-card-section>

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
                <span class="text-body2">克(毫升)</span>
              </template>
            </q-input>
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
      <CustomKeyboard ref="customKeyboard" @change="onChange" @enter="onSubmit" default="number"/>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import TheIngredientNameSelectionDialog from "pages/dishEdit/components/TheIngredientNameSelectionDialog";
import TheIngredientShapeSelectionDialog from "pages/dishEdit/components/TheIngredientShapeSelectionDialog";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const show = () => {
  shown.value = true;
};

const name = ref("");
const weight = ref("");
const min = ref("");
const sec = ref("");
const time = computed(() => parseInt(
  min.value === "" ? "0" : min.value) * 60 + parseInt(sec.value === "" ? "0" : sec.value));

const inputNameToPara = {
  name,
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

const onSubmit = () => {
  shown.value = false;
  emits("submit", {
    name: "水",
    weight: weight.value === "" ? 0 : parseInt(weight.value),
    time: time.value,
    key: Date.now(),
    type: "water"
  });
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
