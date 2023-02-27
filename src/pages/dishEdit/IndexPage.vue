<template>
  <q-page>
    <div class="q-py-md q-pl-md">
      <div class="column">
        <div class="row" style="height: 104px">
          <div class="col-10">
            <StepBar :steps="steps"/>
          </div>
          <div class="col-2 column flex-center">
            <div class="text-caption text-grey-7" style="height: 1.5rem">菜品名称</div>
            <div class="text-body2 q-mb-sm ellipsis text-center text-weight-bold" style="height: 1.5rem;width: 120px">{{ dishName }}</div>
            <q-btn-group outline>
              <q-btn color="primary" text-color="white" label="保存" @click="onSaveStepsBtnClick"/>
              <q-separator inset/>
              <q-btn color="grey" text-color="white" label="清空" @click="clearConfirmShown=true"/>
            </q-btn-group>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="ingredient" :steps="steps.ingredients"/>
          </div>
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="seasoning" :steps="steps.seasonings"/>
          </div>
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="fire" :steps="steps.fires"/>
          </div>
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="stir_fry" :steps="steps.stir_fries"/>
          </div>
        </div>
      </div>
    </div>
    <TheDishNameDialog ref="theDishNameDialog" :is-preseted-dish="isPresetedDish" @submit="onSubmit"/>
    <q-dialog v-model="clearConfirmShown" persistent>
      <q-card style="width: 400px;">
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-subtitle1">确认清空所有步骤？</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="取消" color="" v-close-popup/>
          <q-btn flat label="确认" color="primary" v-close-popup @click="onClearStepsBtnClick"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { ref } from "vue";
import { useQuasar } from "quasar";
import StepList from "pages/dishEdit/components/StepList";
import StepBar from "pages/dishEdit/components/StepBar";
import { cloneDeep } from "lodash/lang";
import { createDish, updateDish } from "src/api/dish";
import { sortBy } from "src/utils/array";
import TheDishNameDialog from "pages/dishEdit/components/TheDishNameDialog";
import { assign, set } from "lodash";

const $q = useQuasar();

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("菜品制作");

const theDishNameDialog = ref(null);
const dishName = ref("");
const isPresetedDish = ref(1); // 当创建一个新菜品时，1“覆盖”功能

const emptySteps = {
  ingredients: [],
  seasonings: [],
  fires: [],
  stir_fries: [],
};

const editedDish = useAppStore.getEditedDish;
const steps = ref(cloneDeep(emptySteps));
if (!useAppStore.getEditedDishStatus) {
  steps.value = editedDish.steps;
  dishName.value = editedDish.name;
  isPresetedDish.value = editedDish.is_preseted;
}

// http://169.254.216.10:8888/static/dish_img/test.png

const stepsList = [];

const clearConfirmShown = ref(false);
const onClearStepsBtnClick = () => {
  steps.value = cloneDeep(emptySteps);
  dishName.value = "";
  isPresetedDish.value = 1;
  useAppStore.clearEditedDish();
  $q.notify({
    message: "已清空",
    position: "top",
    color: "teal",
    timeout: 500,
  });
};

const onSaveStepsBtnClick = () => {
  for (const key in steps.value) {
    stepsList.push(...steps.value[key]);
    stepsList.sort(sortBy("time", 1));
  }
  if (stepsList.length === 0) {
    $q.notify({
      message: "未添加步骤",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    return;
  }
  theDishNameDialog.value.show();
  theDishNameDialog.value.setDefaultName(dishName.value);
};

const onSubmit = async (val, method) => {
  const dish = {
    name: val,
    cook_time: stepsList[stepsList.length - 1].time,
    steps: steps.value
  };
  let res;
  try {
    if (method === "create") {
      res = await createDish(dish);
      if (res.data.success) {
        $q.notify({
          message: "新建成功",
          position: "top",
          color: "teal",
          timeout: 500,
        });
      }
    } else {
      set(dish, "id", editedDish.id);
      set(dish, "image", editedDish.image);
      set(dish, "is_starred", editedDish.is_starred);
      res = await updateDish(dish);
      if (res.data.success) {
        $q.notify({
          message: "覆盖成功",
          position: "top",
          color: "teal",
          timeout: 500,
        });
      }
    }
    dishName.value = val;
  } catch (e) {
    $q.notify({
      message: e.message,
      position: "top",
      color: "red",
      timeout: 500,
    });
  }

};
</script>

<style lang="scss" scoped></style>
