<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col-1"></div>
      <div v-if="useStateMachineStore.getDishSelectedState" class="col-10">
        <div class="column q-gutter-y-none">
          <div class="col flex flex-center text-h6" style="min-height: 32px">
            {{ useStateMachineStore.getDish.name }}
          </div>
          <StepBar :is-running="isRunning" :current-step-number="currentStepNumber" :sorted-steps="sortedDishSteps"/>
          <ControlPanel v-model:isRunning="isRunning" :running-time="runningTime" :is-finished="isFinished"
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
    <q-dialog v-model="isWashing" persistent>
      <WashingDialog :washing-time="washingTime"></WashingDialog>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseStateMachineStore } from "stores/stateMachineStore";
import ControlPanel from "pages/runningControl/components/ControlPanel";
import { ref } from "vue";
import StepBar from "pages/runningControl/components/StepBar";
import WashingDialog from "pages/runningControl/components/WashingDialog";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("运行控制");

const useStateMachineStore = UseStateMachineStore();

const currentStepNumber = ref(useStateMachineStore.getCurrentStepNumber);
const sortedDishSteps = ref(useStateMachineStore.getSortedDishSteps);

const machineState = ref(useStateMachineStore.getStateData.machine_state);
const washingState = ref(useStateMachineStore.getStateData.washing_state);
const temperature = ref(useStateMachineStore.getStateData.temperature_infrared_number);
const temperatureTargetNumber = ref(useStateMachineStore.getStateData.temperature_target_number);

const runningTime = ref(useStateMachineStore.getRunningTime);
const washingTime = ref(useStateMachineStore.getWashingTime);

const isFinished = ref(useStateMachineStore.getCookFinishedState);
const isRunning = ref(useStateMachineStore.getMachineRunningState);
const isWashing = ref(useStateMachineStore.getMachineWashingState);

useStateMachineStore.$subscribe(async (mutation, state) => {
  currentStepNumber.value = state.currentStepNumber;
  sortedDishSteps.value = state.sortedDishSteps;
  machineState.value = state.data.machine_state;
  washingState.value = state.data.washing_state;
  temperature.value = state.data.temperature_infrared_number;
  temperatureTargetNumber.value = state.data.temperature_target_number;
  runningTime.value = state.runningTime;
  washingTime.value = state.washingTime;
  isFinished.value = state.isCookFinished;
  isRunning.value = state.isMachineRunning;
  isWashing.value = state.isMachineWashing;
  console.log(state.data.id, state.data.time, runningTime.value, washingTime.value, machineState.value, washingState.value, new Date().getSeconds());
});
</script>

<style lang="scss" scoped></style>
