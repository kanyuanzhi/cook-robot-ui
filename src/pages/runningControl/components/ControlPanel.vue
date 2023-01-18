<template>
  <div class="row">
    <div class="col-3 flex flex-center">
      <q-btn v-if="!isRunning" round color="green" icon="play_arrow" size="30px" @click="onStartBtnClick"/>
      <ConfirmButton v-else color="orange" icon="pause" operationText="暂停" @confirm="onPauseBtnConfirm"/>
    </div>
    <div class="col-6 flex flex-center">
      <div class="column">
        <div class="col">
          <q-circular-progress
            show-value
            font-size="0.12em"
            class="q-ma-md"
            :value="progressValue"
            size="250px"
            :thickness="0.4"
            :color="progressColor"
            track-color="grey-4"
          >
            <div class="column q-gutter-y-sm flex flex-center">
              <div class="col text-h6">{{ progressLabel }}</div>
              <div class="col">
                {{ progressCountdown }}
              </div>
              <div class="col">
                <q-icon v-if="!isRunning" name="pause" color="orange" size="lg"/>
                <q-spinner-dots v-else color="green" size="lg"></q-spinner-dots>
              </div>
            </div>
          </q-circular-progress>
        </div>
        <div class="col flex flex-center">
          <span style="font-size: 17px">{{ secondsToMMSS(runningTime)  }}/{{ secondsToMMSS(totalTime) }}</span>
        </div>
      </div>


    </div>
    <div class="col-3 flex flex-center">
      <ConfirmButton color="red" icon="stop" operationText="终止" @confirm="onStopBtnConfirm"/>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {UseRunningStore} from "stores/runningStore";
import ConfirmButton from "pages/runningControl/components/ConfirmButton";
import {secondsToMMSS} from "src/utils/timeFormat";

const useRunningStore = UseRunningStore()
let isRunning = ref(false)
isRunning.value = useRunningStore.getRunningStatus

function shiftRunningStatus() {
  isRunning.value = !isRunning.value
  useRunningStore.setRunningStatus(isRunning.value)
}

const totalTime = 15 * 60
const runningTime = ref(2.2 * 60)

const progressValue = ref(0)
progressValue.value = runningTime.value * 100 / totalTime
const progressCountdown = computed(() => {
  // return (totalTime - runningTime.value - (totalTime - runningTime.value) % 60) / 60 + "分" + (totalTime - runningTime.value) % 60 + "秒"
  // return secondsToMMSS(totalTime - runningTime.value, "分", "秒")
  return secondsToMMSS(totalTime - runningTime.value)
})

const progressLabel = computed(() => {
  return isRunning.value ? "运行中" : "暂停"
})

const progressColor = computed(() => {
  return isRunning.value ? "green" : "orange"
})


function onStartBtnClick() {
  shiftRunningStatus()
}

function onPauseBtnConfirm() {
  shiftRunningStatus()
}

function onStopBtnConfirm() {

}
</script>

<style scoped>

</style>
