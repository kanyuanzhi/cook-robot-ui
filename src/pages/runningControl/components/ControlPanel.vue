<template>
  <div class="row justify-center">
    <div class="col-6 flex flex-center">
      <div class="column" style="width: 600px">
        <div class="col flex flex-center">
          <q-circular-progress
            show-value
            font-size="0.12em"
            class="q-ma-md"
            :value="progressValue"
            size="160px"
            :thickness="0.4"
            :color="progressColor"
            track-color="grey-4"
          >
            <q-btn v-if="!isFinished" round flat size="32px" :color="centerBtnColor" @click="onStartBtnClick">
              <q-icon
                v-if="!isRunning"
                name="play_arrow"
                color="blue-8"
                size="70px"
              />
              <q-spinner-dots v-else color="blue-11" size="50px"></q-spinner-dots>
            </q-btn>
            <span v-else class="text-primary text-weight-bold">
              完成
            </span>
          </q-circular-progress>
        </div>
        <div class="col flex flex-center">
          <span class="text-primary" style="font-size: 17px"
          >{{ secondsToMMSS(runningTime) }}/{{
              secondsToMMSS(useStateMachineStore.getDish.cook_time === undefined ? 0 : useStateMachineStore.getDish.cook_time)
            }}</span
          >
        </div>
        <div v-if="isRunning" class="col flex flex-center q-mt-md">
          <span class="text-primary text-subtitle1">当前温度：{{ temperature }}</span>
        </div>
        <div v-if="isRunning" class="col-6 flex flex-center q-mt-md">
          <q-item dense style="width: 100%">
            <q-item-section avatar>火力</q-item-section>
            <q-item-section>
              <q-slider
                v-model="fireLevel"
                color="red"
                marker-labels
                markers
                :min="0"
                :max="10"
                @change="onFireLevelChange"
              />
            </q-item-section>
          </q-item>
        </div>
        <div v-if="isRunning" class="col flex flex-center q-mt-md">
          <q-btn push color="primary" label="紧急停机" @click="onStopBtnClick"/>
        </div>
        <div v-if="!isRunning" class="col flex flex-center q-mt-md">
          <q-btn push rounded color="primary" to="/dishSelect">重新选择</q-btn>
        </div>
        <div v-if="!isRunning" class="col flex flex-center q-mt-md justify-evenly">
          <q-btn push color="primary" label="出菜" @click="onQuickControlBtnClick('dish_out')"/>
          <q-btn push color="primary" label="清洗" @click="onQuickControlBtnClick('wash')"/>
          <q-btn push color="primary" label="复位0" @click="onQuickControlBtnClick('reset0')"/>
          <q-btn push color="primary" label="复位1" @click="onQuickControlBtnClick('reset1')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import { postCommand } from "src/api/command";
import { Command, createSingleInstruction } from "pages/overallControl/components/command";
import { useQuasar } from "quasar";
import { UseStateMachineStore } from "stores/stateMachineStore";

const $q = useQuasar();
const useStateMachineStore = UseStateMachineStore();

const props = defineProps(["runningTime", "isRunning", "isFinished", "temperature", "temperatureTargetNumber"]);

const emits = defineEmits(["update:isRunning"]);

const fireLevel = ref(props.temperatureTargetNumber === 0 ? 0 : (props.temperatureTargetNumber / 200));
watch(
  () => props.temperatureTargetNumber,
  (val) => {
    fireLevel.value = val === 0 ? 0 : (val / 200);
  });

const onFireLevelChange = async (val) => {
  const immediateCommand = new Command("immediate");
  const instruction = createSingleInstruction("fire", 0, "on", val, 0);
  immediateCommand.add(instruction);
  try {
    const res = await postCommand(immediateCommand.getData());
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

const onStopBtnClick = async (val) => {
  const immediateCommand = new Command("immediate");
  const instruction = createSingleInstruction("stop", 0, "on", 0, 0);
  immediateCommand.add(instruction);
  try {
    const res = await postCommand(immediateCommand.getData());
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

function shiftRunningStatus() {
  emits("update:isRunning", !props.isRunning);
}

const progressValue = computed(() => {
  return props.runningTime * 100 / useStateMachineStore.getDish.cook_time;
});

const centerBtnColor = computed(() => {
  return props.isRunning ? "blue-11" : "blue-8";
});

const progressColor = computed(() => {
  return props.isRunning ? "blue-8" : "blue-11";
});

const onStartBtnClick = async () => {
  if (useStateMachineStore.getMachineWashingState) {
    $q.notify("正在清洗，请稍后");
    return;
  }
  if (useStateMachineStore.getMachineRunningState) {
    $q.notify("当前已有菜品正在炒制，请稍后");
    return;
  }
  const steps = useStateMachineStore.getDish.steps;
  const multipleCommand = new Command("multiple");
  for (const key in steps) {
    for (const step of steps[key]) {
      let instruction;
      switch (key) {
        case "prepare":
          instruction = createSingleInstruction("prepare", 0, "on", 0, step.time);
          break;
        case "finish":
          instruction = createSingleInstruction("finish", 0, "on", 0, step.time);
          break;
        case "ingredients":
          if (step.type === "ingredient") {
            instruction = createSingleInstruction("ingredient", step.slot, "on", 0, step.time);
          } else {// water
            instruction = createSingleInstruction("water", 0, "on", step.weight, step.time);
          }
          break;
        case "seasonings":
          instruction = createSingleInstruction("seasoning", step.slot, "on", step.weight, step.time);
          break;
        case "fires":
          instruction = createSingleInstruction("fire", 0, "on", step.gear, step.time);
          break;
        case "stir_fries":
          instruction = createSingleInstruction("stir_fry", 0, "on", step.gear, step.time);
          break;
        default:
          break;
      }
      multipleCommand.add(instruction);
    }
  }
  try {
    multipleCommand.setId(useStateMachineStore.getDish.id);
    const res = await postCommand(multipleCommand.getData());
    useStateMachineStore.setMachineRunningState(true)
    await useStateMachineStore.update()
    console.log(res);
    // shiftRunningStatus();
  } catch (e) {
    console.log(e);
  }
};

const washingDialog = ref(null);
const onQuickControlBtnClick = async (type) => {
  // if (useRunningStore.getWashStatus) {
  //   $q.notify("正在清洗，请稍后");
  //   return;
  // }
  if (type === "wash") {
    // washingDialog.value.show();
    useStateMachineStore.setMachineWashingState(true);
  }
  const singleCommand = new Command("single");
  const instruction = createSingleInstruction(type, 0, "on", 0, 0);
  singleCommand.add(instruction);
  try {
    const res = await postCommand(singleCommand.getData());
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

function onPauseBtnConfirm() {
  shiftRunningStatus();
}

function onStopBtnConfirm() {
}
</script>

<style scoped></style>
