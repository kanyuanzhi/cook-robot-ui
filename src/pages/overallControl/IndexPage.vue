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
        {label:'PLC直控', value:3},
        {label:'PLC参数设置', value:4}
      ]"
        />
      </div>
      <div v-show="commandModel===1 || commandModel===2" class="row" :class="{'single-mode':commandModel===2}">
        <div class="column" :class="{'col-9':commandModel===2,'single-mode':commandModel!==2}">
          <ControlItem title="菜盒" type="ingredient" :label="['编号']" :unit="['']" :min="[1]"
                       :max="[4]" :step="[1]" :btn-label="['添加']" @run="onRun"/>
          <!--          <TheIngredientControl title="菜盒" :slots="[1,2,3,4]" :style="{height: height}" @run="onRun"/>-->
          <!--          <TheWaterControl title="水" :style="{height: height}" @run="onRun"/>-->
          <ControlItem title="水" type="water" :label="['分量']" :unit="['毫升']" :min="[1]"
                       :max="[9999]" :step="[1]" :btn-label="['添加']" @run="onRun"/>
          <ControlItem title="调料盒" type="seasoning" :label="['编号(1~6液体,7~8固体)','分量']"
                       :unit="['','毫升/毫克']" :min="[1,1]"
                       :max="[8,9999]" :step="[1,1]" :btn-label="['添加']" @run="onRun"/>
          <!--          <TheSeasoningControl title="调料盒" :slots="[1,2,3,4,5,6,7,8,9]" :style="{height: '120px'}"-->
          <!--                               @run="onRun"/>-->
          <ControlItem title="火力" type="fire" :label="['档位(30℃/档)']" :unit="['']" :min="[0]"
                       :max="[10]" :step="[1]" :btn-label="['设置','关闭']" @run="onRun"/>
          <ControlItem title="翻炒" type="stir_fry" :label="['档位(40转速/档)']" :unit="['']" :min="[0]"
                       :max="[5]" :step="[1]" :btn-label="['设置','关闭']" @run="onRun"/>
          <!--          <CookControl title="火力档位" type="fire" :min="0" :max="10" color="red-14" :style="{height: height}"-->
          <!--                       @run="onRun"/>-->
          <!--          <CookControl title="翻炒档位" type="stir_fry" :min="0" :max="5" color="amber-10" :style="{height: height}"-->
          <!--                       @run="onRun"/>-->
          <TheQuickControl @run="onRun"/>
        </div>
        <TheMultipleCommandsList v-if="commandModel === 2" :multiple-command="multipleCommand"/>
      </div>
      <div v-show="commandModel===3" class="row">
        <div class="column" style="width: 900px">
          <ControlItem title="X轴" type="x" :label="['目标位置']" :unit="['']" :min="[0]"
                       :max="[9]" :step="[1]" :btn-label="['定位','复位']" height="60px" @run="onRun"/>
          <ControlItem title="Y轴" type="y" :label="['目标位置']" :unit="['']" :min="[0]"
                       :max="[9]" :step="[1]" :btn-label="['定位','复位']" height="60px" @run="onRun"/>
          <ControlItem title="R轴" type="r" :label="['旋转方式(1正转/2反转/3正反转)','旋转速度']" :unit="['','']"
                       :min="[1,0]" :max="[3,200]" :step="[1,1]" :btn-label="['旋转','停止']"
                       height="60px" @run="onRun"/>
          <ControlItem title="液体泵" type="liquid_pump" :label="['泵号','时长']" :unit="['','×0.001s']" :min="[1,0]"
                       :max="[6,9999]" :step="[1,1]" :btn-label="['打开']" height="60px" @run="onRun"/>
          <ControlItem title="固体泵" type="solid_pump" :label="['泵号','时长']" :unit="['','×0.1s']" :min="[1,0]"
                       :max="[2,9999]" :step="[1,1]" :btn-label="['打开']" height="60px" @run="onRun"/>
          <ControlItem title="水泵" type="water_pump" :label="['泵号','时长']" :unit="['','×0.1s']" :min="[1,0]"
                       :max="[1,9999]" :step="[1,1]" :btn-label="['打开']" height="60px" @run="onRun"/>
          <ControlItem title="出菜" type="shake" :label="['抖动次数']" :unit="['']" :min="[1]"
                       :max="[10]" :step="[1]" :btn-label="['出菜']" height="60px" @run="onRun"/>
          <ControlItem title="温控" type="temperature" :label="['目标温度']" :unit="['×0.1℃']" :min="[0]"
                       :max="[3000]" :step="[1]" :btn-label="['设置','关闭']" height="60px" @run="onRun"/>
        </div>
      </div>
      <div v-show="commandModel===4" class="row">
        <div class="column" style="width: 900px">
          <ControlItem title="X轴" type="setting_x" :label="['移动速度']" :unit="['']" :min="[0]"
                       :max="[2000]" :step="[1]" :btn-label="['设置']" @run="onRun"/>
          <ControlItem title="Y轴" type="setting_y" :label="['转动速度']" :unit="['']" :min="[0]"
                       :max="[400]" :step="[1]" :btn-label="['设置']" @run="onRun"/>
          <ControlItem title="R轴" type="setting_r" :label="['旋转速度','正反转圈数']" :unit="['','']" :min="[0,0]"
                       :max="[200,10]" :step="[1,1]" :btn-label="['设置']" @run="onRun"/>
          <ControlItem title="出菜" type="setting_shake" :label="['上行速度','下行速度']" :unit="['','']" :min="[0,0]"
                       :max="[10,10]" :step="[1,1]" :btn-label="['设置']" @run="onRun"/>
          <ControlItem title="温控" type="setting_temperature" :label="['温度上限','温度下限']"
                       :unit="['×0.1℃','×0.1℃']" :min="[0,0]"
                       :max="[3000,3000]" :step="[1,1]" :btn-label="['设置']" @run="onRun" :disable="true"/>
        </div>
      </div>
      <TimeDialog ref="timeDialog" :multiple-command="multipleCommand"/>
    </div>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { ref, watch } from "vue";
import TheMultipleCommandsList from "pages/overallControl/components/TheMultipleCommandList";
import { useQuasar } from "quasar";
import { postCommand, postPLCCommand } from "src/api/command";
import { Command } from "pages/overallControl/components/command";
import TimeDialog from "pages/overallControl/components/TimeDialog";
import TheQuickControl from "pages/overallControl/components/TheQuickControl";
import ControlItem from "components/ControlItem";

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
