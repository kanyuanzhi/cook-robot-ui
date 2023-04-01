<template>
  <div class="row no-wrap">
    <div class="col-9 flex">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row items-center">
          <div class="col-10 q-gutter-sm">
            <q-radio dense v-for="pos in positions" :key="pos" v-model="position" :val="pos" :label="pos"/>
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="定位" @click="onBtnClick('on')"/>
        <q-btn push color="accent" label="复位" @click="onBtnClick('off')"/>
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
const position = ref(0);

const positions_value = [];
for (let i = 0; i < 10; i++) {
  positions_value.push(i);
}
const positions = ref(positions_value);

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
  const plcInstruction = createPLCInstruction(props.type, position.value, action, []);
  emits("run", plcInstruction);
};
</script>

<style lang="scss" scoped>

</style>
