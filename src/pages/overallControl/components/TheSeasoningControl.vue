<template>
  <div class="row no-wrap">
    <div class="col-8 flex">
      <q-item-section no-wrap avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row items-center">
          <div class="col-6 q-gutter-sm">
            <q-radio dense keep-color v-for="s in slots" :key="s" v-model="slot" :val="s" :label="s"
                     :color="displayColor(s)"/>
          </div>
<!--          <q-item-label class="q-mt-sm" caption>1-7为固体调料盒，8、9为液体调料盒</q-item-label>-->
          <div class="col-6">
            <q-select
              dense
              options-dense
              filled
              v-model="weight"
              :options="weightOptions"
              options-cover
              stack-label
              label="分量"
            >
              <template v-slot:append>
                <span class="text-body2">克（毫升）</span>
              </template>
            </q-select>
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-4 flex flex-center">
      <q-btn push color="positive" label="添加" @click="onBtnClick('on')"/>
<!--      <q-btn-group class="q-ml-xs" push>-->
<!--        <q-btn push color="positive" label="全量打开" @click="onBtnClick('open')"/>-->
<!--        <q-btn push color="accent" label="关闭" @click="onBtnClick('off')"/>-->
<!--      </q-btn-group>-->
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

const slot = ref("1");
const weight = ref(1);
const weightOptions = [];
for (let i = 1; i < 101; i++) {
  weightOptions.push(i);
}
const weightInput = ref(null);

const displayColor = (slot) => {
  return ["8", "9"].indexOf(slot) > -1 ? "brown" : "blue";
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
      message: "请选择调料盒",
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
