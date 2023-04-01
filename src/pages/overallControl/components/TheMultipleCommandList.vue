<template>
  <div class="column col-3">
    <q-list bordered separator>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 370px"
      >
        <q-slide-item
          v-for="(ins,index) in multipleCommand.getInstructions()"
          :key="ins.key"
          right-color="red"
          v-ripple
          @right="onRight(index)"
        >
          <template v-slot:right>
            <q-icon name="delete"/>
          </template>
          <q-item clickable>
            <q-item-section>
              {{ instructionInfoDisplay(ins, index) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-scroll-area>
    </q-list>
    <div class="flex flex-center q-mt-md">
      <q-btn-group class="full-width" rounded>
        <q-btn style="width: 50%" push color="primary" @click="onSendBtnClick">发送</q-btn>
        <q-btn style="width: 50%" push color="white" text-color="primary" @click="onClearBtnClick">清空</q-btn>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { secondsToMMSS } from "src/utils/timeFormat";
import { postCommand } from "src/api/command";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps(["multipleCommand"]);

const onRight = (index) => {
  props.multipleCommand.getInstructions()
    .splice(index, 1);
};

const instructionInfoDisplay = (ins, index) => {
  return `${index + 1}. ${secondsToMMSS(ins.time)}, ${ins.type}, ${ins.target}, ${ins.action}, ${ins.measures}`;
};

const onSendBtnClick = async () => {
  if (props.multipleCommand.getData().instructions.length === 0) {
    $q.notify({
      message: "请添加指令",
      position: "top",
      color: "orange",
      timeout: 3000,
    });
    return;
  }
  try {
    const res = await postCommand(props.multipleCommand.getData());
    $q.notify({
      message: res.data.success ? "运行成功" : "运行失败",
      position: "top",
      color: res.data.success ? "green" : "orange",
      timeout: 3000,
    });
  } catch (e) {
    console.log(e.message);
  }
};

const onClearBtnClick = () => {
  props.multipleCommand.clear();
};

const contentStyle = {
  // backgroundColor: "rgba(0,0,0,0.02)",
  backgroundColor: "white",
  color: "#555",
};

const contentActiveStyle = {
  backgroundColor: "#eee",
  color: "black",
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
};
</script>

<style lang="scss" scoped>
.q-item {
  padding: 8px 8px;
}
</style>
