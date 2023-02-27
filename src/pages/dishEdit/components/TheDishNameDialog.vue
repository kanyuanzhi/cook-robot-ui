<template>
  <div>
    <q-dialog v-model="shown" persistent position="top">
      <q-card style="width: 400px;margin-top: 100px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">输入菜品名称</div>
        </q-card-section>
        <q-item dense>
          <q-item-section avatar>名称</q-item-section>
          <q-item-section>
            <q-input
              v-model="name"
              autofocus
              filled
              dense
              @blur="onInputBlur($event, 'name')"
              @focus="onInputFocus($event, 'name')"
            >
            </q-input>
          </q-item-section>
        </q-item>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit('create')">新建</q-btn>
          <q-btn flat color="primary" @click="onSubmit('update')" :disable="isCoverBtnDisabled">覆盖</q-btn>
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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";
import { useQuasar } from "quasar";

const $q = useQuasar();

const emits = defineEmits(["submit"]);
const props = defineProps(["isPresetedDish"]);

const isCoverBtnDisabled = computed(() => {
  return props.isPresetedDish === 1;
});

const shown = ref(false);

const show = () => {
  shown.value = true;
};

const name = ref("");

const inputNameToPara = {
  name,
};

const customKeyboard = ref(null);
const onInputFocus = (e, inputName) => {
  customKeyboard.value.setInputName(inputName);
  customKeyboard.value.setInput(e.target.value, inputName);
};

const onInputBlur = (e, inputName) => {
};

const setDefaultName = (defaultName) => {
  name.value = defaultName;
};

const onChange = (input, inputName) => {
  inputNameToPara[inputName].value = input;
};

const onSubmit = (method) => {// method: "create" | "update"
  if (name.value.trim() === "") {
    $q.notify({
      message: "请输入菜品名称",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    return;
  }
  shown.value = false;
  emits("submit", name.value, method);
};

defineExpose({
  show,
  setDefaultName
});
</script>

<style lang="scss" scoped></style>
