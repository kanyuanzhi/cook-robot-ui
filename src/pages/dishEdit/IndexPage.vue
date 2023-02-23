<template>
  <q-page>
    <div class="q-pa-md">
      <div class="column q-gutter-sm">
        <div class="col">
          <StepBar :steps="steps"/>
        </div>
        <div class="col row q-col-gutter-md q-pl-sm">
          <div class="col">
            <StepList step-name="ingredient" :steps="steps.ingredient"/>
          </div>
          <div class="col">
            <StepList step-name="seasoning" :steps="steps.seasoning"/>
          </div>
          <div class="col">
            <StepList step-name="fire" :steps="steps.fire"/>
          </div>
          <div class="col">
            <StepList step-name="stir_fry" :steps="steps.stir_fry"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {UseAppStore} from "stores/appStore";
import {ref, watch} from "vue";
import {useQuasar} from 'quasar'
import StepList from "pages/dishEdit/components/StepList";
import StepBar from "pages/dishEdit/components/StepBar";

const useAppStore = UseAppStore()
useAppStore.setSubPageTitle("菜品编辑")


const $q = useQuasar()
const standard = ref(20)

const steps = ref({})
steps.value = {
  ingredient:[{
    name: "牛肉",
    shape: "丁状",
    weight: 500,
    time: 300,
    slot: 1
  }],
  seasoning:[{
    name: "盐",
    weight: 200,
    time: 360,
  }],
  fire:[{
    name: "火力一档",
    time: 360,
  },{
    name: "火力三档",
    time: 480,
  },{
    name: "火力关闭",
    time: 560,
  }],
  stir_fry:[{
    name: "翻炒一档",
    time: 360,
  },{
    name: "翻炒关闭",
    time: 560,
  }]
}

</script>

<style lang="scss" scoped>

</style>
