<template>
  <div class="row items-center text-center">
    <div class="col-8">
      <q-item dense>
        <q-item-section avatar>
          <span class="text-weight-bold">{{ title }}</span>
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="level"
            :color="color"
            marker-labels
            markers
            :min="min"
            :max="max"
          />
        </q-item-section>
      </q-item>
    </div>
    <div class="col-4 ">
      <q-btn-group push>
        <q-btn push color="positive" label="按档运行" @click="onBtnClick('on')"/>
        <q-btn push color="accent" label="关闭（0档）" @click="onBtnClick('off')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createSingleInstruction } from "pages/overallControl/components/command";
import { useQuasar } from "quasar";

const $q = useQuasar();
const props = defineProps(["min", "max", "title", "color", "type"]);
const emits = defineEmits(["run"]);

const level = ref(0);

const onBtnClick = (action) => {
  if (level.value === 0) action = "off";
  const instruction = createSingleInstruction(props.type, 0, action, level.value, 0);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
