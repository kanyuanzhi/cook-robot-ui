<template>
  <div>
    <q-dialog v-model="shown" persistent @hide="onHide">
      <!--      <q-card style="width: 400px" class="q-px-sm q-mt-md">-->
      <q-card style="width: 600px" class="q-px-sm">
        <q-card-section>
          <div class="text-h6">添加调料</div>
        </q-card-section>
        <TheSeasoningItem v-for="(seasoning,index) in seasonings" :key="seasoning.key"
                          :seasoning="seasoning" @delete="onDelete(index)"></TheSeasoningItem>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onAdd">添加</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheSeasoningItem from "pages/dishEdit2/components/TheSeasoningItem.vue";
import { cloneDeep } from "lodash/lang";
import { Notify } from "quasar";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

let isUpdate = false;
let stepIndex = 0;

const emptySeasoning = {
  key: new Date().getTime(),
  label: "",
  pump: 0,
  weight: 0
};

const seasonings = ref([
  cloneDeep(emptySeasoning)
]);

const show = (step, index) => {
  shown.value = true;
};

const theSeasonNameSelectionDialog = ref(null);

const onAdd = () => {
  if (seasonings.value.length > 4) {
    Notify.create("同时添加调料数量不能超过5个");
    return;
  }
  const tempSeasoning = cloneDeep(emptySeasoning);
  tempSeasoning.key = new Date().getTime();
  seasonings.value.push(tempSeasoning);
};

const onDelete = (index) => {
  if (seasonings.value.length === 1) {
    Notify.create("至少添加1种调料");
    return;
  }
  seasonings.value.splice(index, 1);
};

const onSubmit = () => {
  try {
    const newSeasonings = [];
    let names = [];
    for (let i = 0; i < seasonings.value.length; i++) {
      newSeasonings.push(cloneDeep(seasonings.value[i]));
      names.push(seasonings.value[i].label + seasonings.value[i].weight + "克");
    }
    const newStep = {
      name: names.join("，"),
      seasonings: newSeasonings,
      key: Date.now(),
      type: "seasoning"
    };
    if (isUpdate) {
      emits("update", newStep, stepIndex);
    } else {
      emits("submit", newStep);
    }
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onHide = () => {
  seasonings.value = [cloneDeep(emptySeasoning)];
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
