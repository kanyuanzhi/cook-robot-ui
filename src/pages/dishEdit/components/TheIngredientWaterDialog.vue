<template>
  <div>
    <q-dialog v-model="shown" persistent>
      <q-card style="width: 400px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加水</div>
        </q-card-section>

        <WeightSelect ref="weightSelect" :min="10" :max="500" :step="10"/>

        <TimeSelect ref="timeSelect"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TimeSelect from "pages/dishEdit/components/TimeSelect";
import WeightSelect from "pages/dishEdit/components/WeightSelect";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const show = () => {
  shown.value = true;
};

const name = ref("");

const weightSelect = ref(null);
const timeSelect = ref(null);

const onSubmit = () => {
  try {
    emits("submit", {
      name: "水",
      weight: weightSelect.value.getWeight(),
      time: timeSelect.value.getTime(),
      key: Date.now(),
      type: "water"
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
