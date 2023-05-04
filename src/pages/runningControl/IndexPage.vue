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
                        :running-time="runningTime" :is-finished="isFinished"
                        :temperature="temperature" :temperature-target-number="temperatureTargetNumber"/>
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
import { floor, ceil } from "lodash";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("运行控制");

const useRunningStore = UseRunningStore();
const dish = useRunningStore.getDish;

const runningTime = ref(useRunningStore.getRunningTime);
const isRunning = ref(useRunningStore.getRunningStatus);

const isFinished = ref(useRunningStore.getIsFinished);
const isSelected = ref(useRunningStore.getIsSelected);

const temperature = ref(0);
const temperatureTargetNumber = ref(0);

let runningTimer;

const timerFunc = async () => {
  const { data } = await getRunningStatus();
  // console.log(data.data["time"]);
  console.log(data.data["machine_state"]);
  temperature.value = data.data["temperature_infrared_number"] / 10;
  temperatureTargetNumber.value = data.data["temperature_target_number"];
  if (data.data["machine_state"] === 2 && !useRunningStore.getWashStatus) {
    runningTime.value = ceil(data.data["time"] / 10);
    useRunningStore.setRunningTime(runningTime.value);
  } else if (data.data["machine_state"] !== 2 && !useRunningStore.getWashStatus) {
    isFinished.value = true;
    useRunningStore.setFinishedStatus(true);
    isRunning.value = false;
    clearInterval(runningTimer);
  } else if (data.data["machine_state"] !== 2 && useRunningStore.getWashStatus) {
    useRunningStore.setWashStatus(false);
    clearInterval(runningTimer);
  }
};

const stateCheck = async () => {
  const { data } = await getRunningStatus();
  const machineState = data.data["machine_state"];
  temperature.value = data.data["temperature_infrared_number"] / 10;
  temperatureTargetNumber.value = data.data["temperature_target_number"];
  console.log(machineState);
  if (machineState === 0) {
    runningTime.value = 0;
    isRunning.value = false;
    useRunningStore.setRunningTime(runningTime.value);
    useRunningStore.setRunningStatus(isRunning.value);
    useRunningStore.setWashStatus(false);
  } else {
    if (!useRunningStore.getWashStatus) {
      runningTime.value = ceil(data.data["time"] / 10);
      isRunning.value = true;
      useRunningStore.setRunningTime(runningTime.value);
      useRunningStore.setRunningStatus(isRunning.value);
    }
    isFinished.value = false;
    useRunningStore.setFinishedStatus(isFinished.value);
    runningTimer = setInterval(timerFunc, 1000);
  }
};
stateCheck();

watch(
  isRunning,
  (newValue) => {
    useRunningStore.setRunningStatus(newValue);
    console.log(newValue);
    if (newValue) {
      runningTimer = setInterval(timerFunc, 1000);
    }
  },
);

const emptyRunningStatus = {
  status: "", // free running pause cleaning
  ingredients: [{
    no: 1,
    status: "off" // off open
  }],

};

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
  clearInterval(runningTimer);
});
</script>

<style lang="scss" scoped></style>
