<template>
  <div>
    <q-dialog v-model="shown" persistent position="top">
      <q-card style="width: 500px; margin-top: 100px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加翻炒</div>
        </q-card-section>

        <q-item dense>
          <q-item-section avatar>档位</q-item-section>
          <q-item-section>
            <q-slider
              v-model="tag"
              color="amber-10"
              marker-labels
              markers
              :min="tagMin"
              :max="tagMax"
            />
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
      <CustomKeyboard ref="customKeyboard" default="number" @change="onChange" @enter="onSubmit"/>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import { getStirFries } from "src/api/stirFry";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const show = () => {
  shown.value = true;
  getStirFries()
    .then(res => {
      tagMin.value = res.data[0].tag;
      tagMax.value = res.data[res.data.length - 1].tag;
      for (let i = 0; i < res.data.length; i++) {
        tagToName.push(res.data[i].name);
      }
    });
};

const tag = ref(0);
const tagMin = ref(0);
const tagMax = ref(0);
const tagToName = [];
const min = ref("");
const sec = ref("");
const time = computed(() => parseInt(
  min.value === "" ? "0" : min.value) * 60 + parseInt(sec.value === "" ? "0" : sec.value));

const inputNameToPara = {
  min,
  sec,
};

const customKeyboard = ref(null);
const onInputFocus = (e, inputName) => {
  customKeyboard.value.setInputName(inputName);
  customKeyboard.value.setInput(e.target.value, inputName);
};

const onChange = (input, inputName) => {
  inputNameToPara[inputName].value = input;
};

const onSubmit = () => {
  shown.value = false;
  emits("submit", {
    name: tagToName[tag.value],
    tag: tag.value,
    time: time.value,
    type: "stir_fry"
  });
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
