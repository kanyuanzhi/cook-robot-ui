<template>
  <div class="row no-wrap items-center justify-center" :style="{height:height}">
    <div class="col-2">
      <q-btn push rounded color="primary" label="准备COOK" @click="onBtnClick('prepare')"/>
    </div>
    <div class="col-2">
      <q-btn push rounded color="primary" label="出菜" @click="onBtnClick('dish_out')"/>
    </div>
  </div>
</template>

<script setup>
import { createSingleInstruction } from "pages/overallControl/components/command";

const props = defineProps({
  height: {
    type: String,
    default: "65px"
  },
});
const emits = defineEmits(["run"]);

const onBtnClick = (type) => {
  const instruction = createSingleInstruction(type, 0, "on", 0, 0);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
