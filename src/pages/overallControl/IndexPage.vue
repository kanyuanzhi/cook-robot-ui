<template>
  <q-page>
    <div class="q-pa-md column flex flex-center">
      <div class="row flex flex-center">
        <q-btn-toggle
          v-model="commandModel"
          push
          toggle-color="primary"
          :options="[
        {label: '单指令模式', value: 1},
        {label: '多指令模式', value: 2},
        {label:'PLC直控', value:3}
      ]"
        />
      </div>
      <div v-show="commandModel!==3" class="row" :class="{'single-mode':commandModel===2}">
        <div class="column" :class="{'col-10':commandModel===2,'single-mode':commandModel!==2}">
          <TheIngredientControl title="菜盒" :slots="[1,2,3,4]" :style="{height: height}" @run="onRun"/>
          <TheWaterControl title="水" :style="{height: height}" @run="onRun"/>
          <TheSeasoningControl title="调料盒" :slots="[1,2,3,4,5,6,7,8,9]" :style="{height: '120px'}"
                               @run="onRun"/>
          <CookControl title="火力档位" type="fire" :min="0" :max="10" color="red-14" :style="{height: height}"
                       @run="onRun"/>
          <CookControl title="翻炒档位" type="stir_fry" :min="0" :max="5" color="amber-10" :style="{height: height}"
                       @run="onRun"/>
          <TheQuickControl :style="{height: height}" @run="onRun"/>
        </div>
        <TheMultipleCommandsList v-if="commandModel === 2" :multiple-command="multipleCommand"/>
      </div>
      <div v-show="commandModel===3" class="row">
        <div class="column" style="width: 900px">
          <ThePLCXYControl title="X轴" type="x" :style="{height: height}" @run="onRun"/>
          <ThePLCXYControl title="Y轴" type="y" :style="{height: height}" @run="onRun"/>
          <ThePLCRControl title="R轴" type="r" :style="{height: height}" @run="onRun"/>
          <ThePLCPumpControl title="供料泵" type="pump" :style="{height: height}" @run="onRun"/>
          <ThePLCShakeControl title="出菜" type="shake" :style="{height: height}" @run="onRun"/>
          <ThePLCTemperatureControl title="温控" type="temperature" :style="{height: height}" @run="onRun"/>
        </div>
      </div>
      <TimeDialog ref="timeDialog" :multiple-command="multipleCommand"/>
    </div>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { ref, watch } from "vue";
import CookControl from "pages/overallControl/components/CookControl";
import TheMultipleCommandsList from "pages/overallControl/components/TheMultipleCommandList";
import TheSeasoningControl from "pages/overallControl/components/TheSeasoningControl";
import TheIngredientControl from "pages/overallControl/components/TheIngredientControl";
import TheWaterControl from "pages/overallControl/components/TheWaterControl";
import { useQuasar } from "quasar";
import { postCommand, postPLCCommand } from "src/api/command";
import { Command } from "pages/overallControl/components/command";
import TimeDialog from "pages/overallControl/components/TimeDialog";
import ThePLCXYControl from "pages/overallControl/components/ThePLCXYControl";
import ThePLCRControl from "pages/overallControl/components/ThePLCRControl";
import ThePLCPumpControl from "pages/overallControl/components/ThePLCPumpControl";
import ThePLCShakeControl from "pages/overallControl/components/ThePLCShakeControl";
import TheQuickControl from "pages/overallControl/components/TheQuickControl";
import ThePLCTemperatureControl from "pages/overallControl/components/ThePLCTemperatureControl";

const $q = useQuasar();

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("全量控制");

const commandModel = ref(1);

const height = ref("65px");

const singleCommand = new Command("single");
const multipleCommand = new Command("multiple");
const plcCommand = new Command("plc");

const timeDialog = ref(null);

const onRun = async (instruction) => {
  $q.notify({
    message: JSON.stringify(instruction),
    position: "bottom",
    color: "primary",
    timeout: 3000,
  });
  if (commandModel.value === 1) {
    try {
      singleCommand.clear();
      singleCommand.add(instruction);
      const res = await postCommand(singleCommand.getData());

      $q.notify({
        message: res.data.success ? "运行成功" : "运行失败",
        position: "top",
        color: res.data.success ? "green" : "orange",
        timeout: 3000,
      });
    } catch (e) {
      console.log(e.message);
    }
  } else if (commandModel.value === 2) {
    timeDialog.value.show(instruction);
  } else {
    try {
      plcCommand.clear();
      plcCommand.add(instruction);
      const res = await postPLCCommand(plcCommand.getData());
      $q.notify({
        message: res.data.success ? "运行成功" : "运行失败",
        position: "top",
        color: res.data.success ? "green" : "orange",
        timeout: 3000,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
};

</script>

<style lang="scss" scoped>
.single-mode {
  width: 900px;
}
</style>
