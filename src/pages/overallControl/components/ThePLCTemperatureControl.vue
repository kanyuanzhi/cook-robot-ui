<template>
  <div class="row no-wrap">
    <div class="col-9 flex no-wrap">
      <q-item-section avatar >
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row q-gutter-sm items-center">
          <div class="col-4">
            <q-select
              dense
              options-dense
              filled
              v-model="temperature"
              :options="temperatureOptions"
              options-cover
              stack-label
              label="温度(℃)"
            />
          </div>
          <q-item-label class="q-mt-sm" caption>温度0表示关闭</q-item-label>

        </div>
      </q-item-section>
    </div>
    <div class="col-3 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="控温" @click="onBtnClick('on')"/>
        <q-btn push color="accent" label="关闭" @click="onBtnClick('off')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createPLCInstruction } from "pages/overallControl/components/command";

const props = defineProps(["title", "type"]);
const emits = defineEmits(["run"]);

const temperature = ref(0);
const temperatureOptions = [];
for (let i = 0; i < 301; i++) {
  temperatureOptions.push(i);
}

const onBtnClick = (action) => {
  const instruction = createPLCInstruction(props.type, 0, action, [temperature.value]);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
