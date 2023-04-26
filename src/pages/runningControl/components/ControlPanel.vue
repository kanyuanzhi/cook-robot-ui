<template>
  <div class="row justify-center">
    <div class="col-6 flex flex-center">
      <div class="column">
        <div class="col">
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
              secondsToMMSS(cookTime === undefined ? 0 : cookTime)
            }}</span
          >
        </div>
        <div v-if="!isRunning" class="col flex flex-center q-mt-md">
          <q-btn color="primary" to="/dishSelect">重新选择</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import { postCommand } from "src/api/command";
import { sortBy } from "src/utils/array";
import { UseRunningStore } from "stores/runningStore";
import { Command, createSingleInstruction } from "pages/overallControl/components/command";

const props = defineProps(["cookTime", "runningTime", "isRunning", "isFinished"]);

const emits = defineEmits(["update:isRunning"]);

function shiftRunningStatus() {
  emits("update:isRunning", !props.isRunning);
}

const progressValue = computed(() => {
  return props.runningTime * 100 / props.cookTime;
});

const centerBtnColor = computed(() => {
  return props.isRunning ? "blue-11" : "blue-8";
});

const centerBtnIcon = computed(() => {
  return props.isRunning ? "pause" : "play_arrow";
});

const progressCountdown = computed(() => {
  return secondsToMMSS(props.cookTime - props.runningTime);
});

const progressLabel = computed(() => {
  return props.isRunning ? "运行中" : "暂停";
});

const progressColor = computed(() => {
  return props.isRunning ? "blue-8" : "blue-11";
});

const onStartBtnClick = async () => {
  if (props.isRunning) return; //运行过程中不允许暂停
  const steps = UseRunningStore().getDish.steps;
  const multipleCommand = new Command("multiple");
  for (const key in steps) {
    for (const step of steps[key]) {
      let instruction;
      switch (key) {
        case "prepare":
          instruction = createSingleInstruction("prepare", 0, "on", 0, step.time);
          break;
        case "dish_out":
          instruction = createSingleInstruction("dish_out", 0, "on", 0, step.time);
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
    const res = await postCommand(multipleCommand.getData());
    console.log(res);
    shiftRunningStatus();
  } catch (e) {
    console.log(e);
  }
  // const instructions =
  // const res = await postCommand(singleCommand.getData());

  // shiftRunningStatus();
};

function onPauseBtnConfirm() {
  shiftRunningStatus();
}

function onStopBtnConfirm() {
}
</script>

<style scoped></style>
