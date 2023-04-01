<template>
  <div class="row no-wrap">
    <div class="col-9 flex no-wrap">
      <q-item-section avatar >
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row q-gutter-sm items-center">
          <div class="col">
            <q-btn-toggle
              dense
              v-model="direction"
              push
              toggle-color="primary"
              :options="directionOptions"
            />
          </div>
          <div class="col">
            <q-select
              dense
              options-dense
              filled
              v-model="speed"
              :options="speedOptions"
              options-cover
              stack-label
              label="转速(0~200)"
            />
          </div>
          <div class="col">
            <q-select
              dense
              options-dense
              filled
              v-model="circle"
              :options="circleOptions"
              options-cover
              stack-label
              label="正反转圈数(0~10)"
            />
          </div>
<!--          <q-item-label class="q-mt-sm" caption>圈数0表示一直旋转</q-item-label>-->

        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="旋转" @click="onBtnClick('on')"/>
        <q-btn push color="accent" label="停止" @click="onBtnClick('off')"/>
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

const direction = ref("forward");
const speed = ref(0);
const circle = ref(0)

const directionOptions = [
  {
    label: "正转",
    value: "forward"
  },
  {
    label: "反转",
    value: "reverse"
  },
  {
    label: "正反转",
    value: "mix"
  }
];
const speedOptions = [];
for (let i = 1; i < 201; i++) {
  speedOptions.push(i);
}
const circleOptions = [];
for (let i = 1; i < 11; i++) {
  circleOptions.push(i);
}


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
  const instruction = createPLCInstruction(props.type, direction.value, action, [speed.value, circle.value]);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
