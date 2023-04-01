<template>
  <div class="row no-wrap">
    <div class="col-9 flex">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row q-gutter-sm items-center">
          <div class="col">
            <q-select
              dense
              options-dense
              filled
              v-model="shakeCount"
              :options="shakeCountOptions"
              options-cover
              stack-label
              label="抖动次数"
            />
          </div>
          <div class="col">
            <q-select
              dense
              options-dense
              filled
              v-model="upSpeed"
              :options="speedOptions"
              options-cover
              stack-label
              label="上行速度"
            />
          </div>
          <div class="col">
            <q-select
              dense
              options-dense
              filled
              v-model="downSpeed"
              :options="speedOptions"
              options-cover
              stack-label
              label="下行速度"
            />
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="出菜" @click="onBtnClick('on')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createPLCInstruction, createSingleInstruction } from "pages/overallControl/components/command";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps(["title", "type"]);
const emits = defineEmits(["run"]);

const shakeCount = ref(1);
const upSpeed = ref(1);
const downSpeed = ref(1)


const shakeCountOptions = [];
for (let i = 1; i < 11; i++) {
  shakeCountOptions.push(i);
}
const speedOptions = [];
for (let i = 1; i < 11; i++) {
  speedOptions.push(i);
}

const onBtnClick = (action) => {
  const instruction = createPLCInstruction(props.type, 0, action, [shakeCount.value, upSpeed.value, downSpeed.value]);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
