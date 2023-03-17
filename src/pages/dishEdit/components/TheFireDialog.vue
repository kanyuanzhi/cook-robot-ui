<template>
  <div>
    <q-dialog v-model="shown" persistent>
      <q-card style="width: 500px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加火力</div>
        </q-card-section>

        <q-item dense>
          <q-item-section avatar>档位</q-item-section>
          <q-item-section>
            <q-slider
              v-model="tag"
              color="red-14"
              marker-labels
              markers
              :min="tagMin"
              :max="tagMax"
            />
          </q-item-section>
        </q-item>

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
import { getFires } from "src/api/fire";
import TimeSelect from "pages/dishEdit/components/TimeSelect";

const emits = defineEmits(["submit"]);

const shown = ref(false);

const show = () => {
  shown.value = true;
  getFires()
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

const timeSelect = ref(null);

const onSubmit = () => {
  try{
    emits("submit", {
      name: tagToName[tag.value],
      tag: tag.value,
      time: timeSelect.value.getTime(),
      key: Date.now(),
      type: "fire"
    });
  }catch (e) {
    return
  }
  shown.value = false;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
