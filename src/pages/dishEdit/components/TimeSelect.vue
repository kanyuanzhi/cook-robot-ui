<template>
  <q-item dense>
    <q-item-section avatar>时刻</q-item-section>
    <q-item-section>
      <div class="row q-col-gutter-md">
        <div class="col">
          <q-select
            dense
            options-dense
            filled
            v-model="min"
            :options="minOptions"
            options-cover
            stack-label
            label="分"
          />
        </div>
        <div class="col">
          <q-select
            dense
            options-dense
            filled
            v-model="sec"
            :options="secOptions"
            options-cover
            stack-label
            label="秒"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { floor } from "lodash";

const $q = useQuasar();

const min = ref({
  label: "00",
  value: 0
});
const sec = ref({
  label: "00",
  value: 0
});
const minOptions = [];
const secOptions = [];
for (let i = 0; i < 61; i++) {
  minOptions.push({
    label: i < 10 ? "0" + i : String(i),
    value: i
  });
  if (i !== 60) {
    secOptions.push({
      label: i < 10 ? "0" + i : String(i),
      value: i
    });
  }
}

const getTime = () => {
  const time = min.value.value * 60 + sec.value.value;
  if (time === 0) {
    $q.notify({
      message: "时刻不能为0",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    throw Error("time is 0");
  }
  return min.value.value * 60 + sec.value.value;
};

const setTime = (v) => {
  min.value = {
    label: floor(v / 60) < 10 ? "0" + floor(v / 60) : String(floor(v / 60)),
    value: floor(v / 60)
  };
  sec.value = {
    label: v % 60 < 10 ? "0" + v % 60 : String(v % 60),
    value: v % 60
  };
};

defineExpose({
  getTime,
  setTime
});
</script>

<style lang="scss" scoped>

</style>
