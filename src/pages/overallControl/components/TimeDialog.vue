<template>
  <q-dialog v-model="shown" persistent>
    <q-card style="width: 400px;" class="q-px-sm q-mt-md">
      <q-card-section>
        <div class="text-h6">设置执行时间</div>
      </q-card-section>
      <q-item dense>
        <q-item-section>
          <div class="row q-col-gutter-md">
            <div class="col">
              <q-select
                dense
                options-dense
                filled
                v-model="hour"
                :options="options"
                options-cover
                stack-label
                label="时"
              />
            </div>
            <div class="col">
              <q-select
                dense
                options-dense
                filled
                v-model="min"
                :options="options"
                options-cover
                stack-label
                label="分"
              />
            </div>
            <div class="col">
              <q-select
                dense
                options-dense
                filled
                v-model="sec"
                :options="options"
                options-cover
                stack-label
                label="秒"
              />
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
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["multipleCommand"]);
const emits = defineEmits(["submit"]);

const instruction = ref({});
const shown = ref(false);

const show = (ins) => {
  shown.value = true;
  instruction.value = ins;
};

const hour = ref({
  label: "00",
  value: 0
});
const min = ref({
  label: "00",
  value: 0
});
const sec = ref({
  label: "00",
  value: 0
});
const options = [];
for (let i = 0; i < 60; i++) {
  options.push({
    label: i < 10 ? "0" + i : String(i),
    value: i
  });
}

const onSubmit = () => {
  instruction.value.time = hour.value.value * 3600 + min.value.value * 60 + sec.value.value;
  props.multipleCommand.add(instruction.value);
  shown.value = false;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
