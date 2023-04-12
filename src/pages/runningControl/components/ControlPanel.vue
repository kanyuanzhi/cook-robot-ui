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

function onStartBtnClick() {
  if (props.isRunning) return; //运行过程中不允许暂停
  shiftRunningStatus();
}

function onPauseBtnConfirm() {
  shiftRunningStatus();
}

function onStopBtnConfirm() {
}
</script>

<style scoped></style>
