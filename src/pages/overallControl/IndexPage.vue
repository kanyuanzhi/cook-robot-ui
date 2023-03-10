<template>
  <q-page>
    <div class="q-pa-md column flex flex-center">
      <div class="row flex flex-center">
        <q-btn-toggle
          v-model="isSingleCommand"
          push
          toggle-color="primary"
          :options="[
        {label: '单指令模式', value: true},
        {label: '多指令模式', value: false}
      ]"
        />
      </div>
      <div class="row">
        <div class="column" :class="{'col-10':!isSingleCommand}">
          <TheIngredientControl title="菜盒" :slots="['1','2','3','4']" :style="{height: height}" @run="onRun"/>
          <TheWaterControl title="水" :style="{height: height}" @run="onRun"/>
          <TheSeasoningControl title="调料盒" :slots="['1','2','3','4','5','6','7','8','9']" :style="{height: '120px'}"
                               @run="onRun"/>
          <CookControl title="火力档位" type="fire" :min="0" :max="10" color="red-14" :style="{height: height}"
                       @run="onRun"/>
          <CookControl title="翻炒档位" type="stir_fry" :min="0" :max="5" color="amber-10" :style="{height: height}"
                       @run="onRun"/>
        </div>
        <TheMultipleCommandsList v-if="!isSingleCommand" :multiple-command="multipleCommand"/>
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
import { postCommand } from "src/api/command";
import { Command } from "pages/overallControl/components/command";
import TimeDialog from "pages/overallControl/components/TimeDialog";

const $q = useQuasar();

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("全量控制");

const isSingleCommand = ref(true);

const height = ref("85px");

const singleCommand = new Command("single");
const multipleCommand = new Command("multiple");

const timeDialog = ref(null);

const onRun = async (instruction) => {
  $q.notify({
    message: JSON.stringify(instruction),
    position: "bottom",
    color: "primary",
    timeout: 3000,
  });
  if (isSingleCommand.value) {
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
  } else {
    timeDialog.value.show(instruction);
  }
};

</script>

<style lang="scss" scoped>

</style>
