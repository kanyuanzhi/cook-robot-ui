<template>
  <div class="row no-wrap">
    <div class="col-8 flex">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row items-center">
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
import { useQuasar } from "quasar";
import { createSingleInstruction } from "pages/overallControl/components/command";

const $q = useQuasar();

const props = defineProps(["title"]);
const emits = defineEmits(["run"]);

const weight = ref(1);
const weightOptions = [];
for (let i = 1; i < 101; i++) {
  weightOptions.push(i);
}
const weightInput = ref(null);

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
  if (action === "on" && weightMeasure.value === 0) {
    $q.notify({
      message: "请输入添加水的分量(不能为0)",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    return;
  }
  const instruction = createSingleInstruction("water", 0, action, weightMeasure.value, 0);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
