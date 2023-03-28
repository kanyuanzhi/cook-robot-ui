<template>
  <div class="row no-wrap">
    <div class="col-9 flex">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row items-center q-col-gutter-md">
          <div class="col-6">
            <OptionalInput v-model="upSpeed" label="上行速度" :min="0" :max="10" :step="1"/>
          </div>
          <div class="col-6">
            <OptionalInput v-model="downSpeed" label="下行速度" :min="0" :max="10" :step="1"/>
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="设置" @click="onBtnClick('on')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { createPLCInstruction } from "pages/overallControl/components/command";
import { ref } from "vue";
import OptionalInput from "components/OptionalInput";

const props = defineProps(["type", "title"]);

const emits = defineEmits(["run"]);

const upSpeed = ref(0);
const downSpeed = ref(0);

const onBtnClick = (action) => {
  const instruction = createPLCInstruction(props.type, 0, action, [upSpeed.value, downSpeed.value]);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
