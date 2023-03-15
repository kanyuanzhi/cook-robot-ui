<template>
  <div class="row no-wrap">
    <div class="col-9 flex">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row items-center">
          <div class="col-8 q-gutter-sm">
            <q-radio dense keep-color v-for="s in slots" :key="s" v-model="slot" :val="s" :label="s"
                     :color="displayColor(s)"/>
          </div>
          <div class="col-4">
            <q-select
              dense
              options-dense
              filled
              v-model="period"
              :options="periodOptions"
              options-cover
              stack-label
              label="供料时长"
            >
              <template v-slot:append>
                <span class="text-body2">×100ms</span>
              </template>
            </q-select>
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="供料" @click="onBtnClick('on')"/>
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

const slot = ref("1");
const slots = [];
for (let i = 1; i < 10; i++) {
  slots.push(String(i));
}

const period = ref(1);
const periodOptions = [];
for (let i = 1; i < 51; i++) {
  periodOptions.push(i);
}

const displayColor = (slot) => {
  return ["8", "9"].indexOf(slot) > -1 ? "brown" : "blue";
};

const onBtnClick = (action) => {
  // if (position.value === "0") {
  //   $q.notify({
  //     message: "请定位",
  //     position: "top",
  //     color: "orange",
  //     timeout: 500,
  //   });
  //   return;
  // }
  const instruction = createPLCInstruction(props.type, slot.value, action, [period.value]);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
