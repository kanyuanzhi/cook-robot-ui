<template>
  <div class="row">
    <div class="col-8 flex">
      <q-item dense>
        <q-item-section avatar>
          <span class="text-weight-bold">{{ title }}</span>
        </q-item-section>
        <q-item-section side>
          <q-input ref="weightInput" dense filled v-model="weight" label="分量" @focus="onInputFocus"
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
import { useQuasar } from "quasar";
import { createSingleInstruction } from "pages/overallControl/components/command";

const $q = useQuasar();

const props = defineProps(["title"]);
const emits = defineEmits(["run"]);

const weight = ref("");
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
