<template>
  <div class="row">
    <div class="col-8 flex">
      <q-item dense>
        <q-item-section no-wrap avatar>
          <span class="text-weight-bold">{{ title }}</span>
        </q-item-section>
        <q-item-section>
          <div class="q-gutter-sm">
            <q-radio dense keep-color v-for="s in slots" :key="s" v-model="slot" :val="s" :label="s"
                     :color="displayColor(s)"/>
          </div>
          <q-item-label class="q-mt-sm" caption>1、2为固体调料盒，3-9为液体调料盒</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-input ref="weightInput" dense bottom-slots filled v-model="weight" label="分量" @focus="onInputFocus"
                   @blur="onInputBlur">
            <template v-slot:append>
              <span class="text-body2">克(毫升)</span>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </div>
    <div class="col-4 flex flex-center">
      <q-btn push color="primary" label="按量打开" @click="onBtnClick('on')"/>
      <q-btn-group class="q-ml-xs" push>
        <q-btn push color="positive" label="全量打开" @click="onBtnClick('open')"/>
        <q-btn push color="accent" label="关闭" @click="onBtnClick('off')"/>
      </q-btn-group>
    </div>
    <q-dialog
      v-model="keyboardShown"
      no-focus
      no-refocus
      full-width
      position="bottom"
    >
      <NumberKeyboard ref="numberKeyboard" :default-input="weight" @change="onChange" @enter="onEnter"/>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import NumberKeyboard from "src/components/NumberKeyboard";
import { createSingleInstruction } from "pages/overallControl/components/command";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps(["slots", "title"]);
const emits = defineEmits(["run"]);

const slot = ref(0);
const weight = ref("");
const weightInput = ref(null);

const displayColor = (slot) => {
  return ["1", "2"].indexOf(slot) > -1 ? "brown" : "blue";
};

const keyboardShown = ref(false);
const numberKeyboard = ref(null);

const onInputFocus = () => {
  keyboardShown.value = true;
};
const onInputBlur = () => {
  keyboardShown.value = false;
};

const onChange = (input) => {
  weight.value = input;
};

const onEnter = () => {
  weightInput.value.blur();
};

const weightMeasure = computed(() => {
  return isNaN(Number(weight.value)) ? 0 : Number(weight.value);
});

const onBtnClick = (action) => {
  if (slot.value === 0) {
    $q.notify({
      message: "请选择菜盒",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    return;
  }
  if (action === "on" && weightMeasure.value === 0) {
    $q.notify({
      message: "请输入添加调料的分量(不能为0)",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    return;
  }
  const instruction = createSingleInstruction("seasoning", slot.value, action, weightMeasure.value, 0);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
