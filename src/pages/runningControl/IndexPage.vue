<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col-1"></div>
      <div v-if="isSelected" class="col-10">
        <div class="column q-gutter-y-none">
          <div class="col flex flex-center text-h6" style="min-height: 32px">
            {{ dish.name }}
          </div>
          <StepBar class="" :is-running="isRunning" :steps="dish.steps" :running-time="runningTime"/>
          <ControlPanel v-model:isRunning="isRunning" :cook-time="dish.cook_time"
                        :running-time="runningTime" :is-finished="isFinished"/>
        </div>
      </div>
      <div v-else class="col-10 flex justify-center items-center">
        <div style="width: 200px;margin-top: 200px">
          <q-btn
            to="/dishSelect"
            class="fit"
            square
            color="primary"
            style="padding: 30px 40px;font-size: 20px"
          >请选择菜品
          </q-btn>
        </div>
      </div>
      <div class="col-1">
<!--        <q-btn label="repeat" color="primary" @click="startRunning"/>-->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseRunningStore } from "stores/runningStore";
import ControlPanel from "pages/runningControl/components/ControlPanel";
import { onUnmounted, ref, watch } from "vue";
import { getRunningStatus } from "src/api/runningStatus";
import StepBar from "pages/runningControl/components/StepBar";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("运行控制");

const useRunningStore = UseRunningStore();
const dish = useRunningStore.getDish;
const runningTime = ref(useRunningStore.getRunningTime);
const isRunning = ref(useRunningStore.getRunningStatus);
const isSelected = ref(useRunningStore.getIsSelected);
const isFinished = ref(false);
console.log("runningTime: "+runningTime.value)

watch(
  isRunning,
  (newVlaue) => {
    useRunningStore.setRunningStatus(newVlaue);
  },
);

const emptyRunningStatus = {
  status: "", // free running pause cleaning
  ingredients: [{
    no: 1,
    status: "off" // off open
  }],

};
const runningSpeed = 100;
let runningTimer;

const startRunning = () => {
  if (runningTimer) {
    clearInterval(runningTimer);
    runningTime.value = 0;
    useRunningStore.setRunningTime(runningTime.value);
    isFinished.value = false;
  }

  runningTimer = setInterval(() => {
    if (isRunning.value) {
      runningTime.value++;
      useRunningStore.setRunningTime(runningTime.value);
      if (runningTime.value >= dish.cook_time) {
        isFinished.value = true;
        isRunning.value = false
        clearInterval(runningTimer);
      }
    }
  }, 1000 / runningSpeed);
};
startRunning();

const runningStatus = ref();

// const t = setInterval(async () => {
//   try {
//     const res = await getRunningStatus();
//     runningStatus.value = res.data;
//     console.log(res.data);
//   } catch (e) {
//     console.log(e);
//   }
// }, 1000);

onUnmounted(() => {
  // clearInterval(t);
});
</script>

<style lang="scss" scoped></style>
