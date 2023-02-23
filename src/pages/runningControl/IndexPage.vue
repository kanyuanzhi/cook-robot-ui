<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="column q-gutter-y-none">
          <div class="col flex flex-center text-h6">{{ dishesName }}</div>
          <div class="col">
            <CookStep :is-running="isRunning" />
          </div>
          <div class="col">
            <ControlPanel />
          </div>
          <!--            <div class="col">-->
          <!--            </div>-->
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </q-page>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseRunningStore } from "stores/runningStore";
import ControlPanel from "pages/runningControl/components/ControlPanel";
import CookStep from "pages/runningControl/components/CookStep";
import { ref, watch } from "vue";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("运行控制");

const useRunningStore = UseRunningStore();
const dishesName = useRunningStore.getDishesName;
const isRunning = ref(false);

watch(
  useRunningStore.$state,
  (state) => {
    isRunning.value = state.isRunning;
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped></style>
