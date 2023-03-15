<template>
  <div class="row no-wrap items-center justify-center">
    <div class="col-2">
      <q-btn push color="positive" label="准备COOK" @click="onBtnClick('prepare')"/>
    </div>
    <div class="col-2">
      <q-btn push color="positive" label="出菜" @click="onBtnClick('dish_out')"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createSingleInstruction } from "pages/overallControl/components/command";
import { useQuasar } from "quasar";

const $q = useQuasar();
const emits = defineEmits(["run"]);

const onBtnClick = (type) => {
  const instruction = createSingleInstruction(type, 0, "on", 0, 0);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
