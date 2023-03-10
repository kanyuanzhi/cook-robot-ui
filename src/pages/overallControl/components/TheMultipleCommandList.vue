<template>
  <div class="column col-2">
    <q-list bordered separator>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 385px"
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
    <div class="flex flex-center q-mt-sm">
      <q-btn-group class="full-width" push>
        <q-btn style="width: 50%" push color="positive" @click="onSendBtnClick">发送</q-btn>
        <q-btn style="width: 50%" push color="grey" @click="onClearBtnClick">清空</q-btn>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { secondsToMMSS } from "src/utils/timeFormat";
import { postCommand } from "src/api/command";

const props = defineProps(["multipleCommand"]);

const onRight = (index) => {
  props.multipleCommand.getInstructions().splice(index, 1);
};

const instructionInfoDisplay = (ins, index) => {
  return `${index + 1}. ${secondsToMMSS(ins.time)}, ${ins.type}, ${ins.target}, ${ins.action}, ${ins.measure}`;
};

const onSendBtnClick = async () => {
  try {
    const res = await postCommand(props.multipleCommand.getData());
    console.log(res.data);
  } catch (e) {
    console.log(e.message);
  }
};

const onClearBtnClick = () => {
  props.multipleCommand.clear()
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
