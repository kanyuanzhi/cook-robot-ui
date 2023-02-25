<template>
  <q-page>
    <div class="q-py-md q-pl-md">
      <div class="column">
        <div class="row">
          <div class="col-10">
            <StepBar :steps="steps"/>
          </div>
          <div class="col-2 flex flex-center">
            <q-btn-group outline>
              <q-btn color="primary" text-color="white" label="保存"/>
              <q-separator inset/>
              <q-btn color="grey" text-color="white" label="清空" @click="onClearStepsBtnClick"/>
            </q-btn-group>
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="ingredient" :steps="steps.ingredient"/>
          </div>
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="seasoning" :steps="steps.seasoning"/>
          </div>
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="fire" :steps="steps.fire"/>
          </div>
          <div class="col q-mr-md" style="height: 0">
            <StepList step-name="stir_fry" :steps="steps.stir_fry"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import StepList from "pages/dishEdit/components/StepList";
import StepBar from "pages/dishEdit/components/StepBar";
import { cloneDeep } from "lodash/lang";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("菜品制作");

const $q = useQuasar();

const emptySteps = {
  ingredient: [],
  seasoning: [],
  fire: [],
  stir_fry: [],
};

const steps = ref(cloneDeep(emptySteps));

const onClearStepsBtnClick = () => {
  steps.value = cloneDeep(emptySteps);
};
</script>

<style lang="scss" scoped></style>
