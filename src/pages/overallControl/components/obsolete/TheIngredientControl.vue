<template>
  <div class="row no-wrap">
    <div class="col-8 flex no-wrap">
      <q-item-section avatar>
        <span class="text-weight-bold">{{ title }}</span>
      </q-item-section>
      <q-item-section>
        <div class="row items-center">
          <div class="col-10">
            <q-radio v-for="s in slots" :key="s" v-model="slot" :val="s" :label="s"/>
          </div>
        </div>
      </q-item-section>
    </div>
    <div class="col-4 flex flex-center">
      <q-btn-group push>
        <q-btn push color="positive" label="倾倒" @click="onBtnClick('on')"/>
        <!--        <q-btn push color="accent" label="复位" @click="onBtnClick('off')"/>-->
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createSingleInstruction } from "pages/overallControl/components/command";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps(["slots", "title"]);
const emits = defineEmits(["run"]);
const slot = ref(1);

const onBtnClick = (action) => {
  if (slot.value === 0) {
    $q.notify({
      message: "请选择菜盒",
      position: "top",
      color: "orange",
      timeout: 500,
    });
    return;
  }
  const instruction = createSingleInstruction("ingredient", slot.value, action, 0, 0);
  emits("run", instruction);
};
</script>

<style lang="scss" scoped>

</style>
