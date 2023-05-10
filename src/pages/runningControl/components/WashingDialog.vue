<template>
  <q-card style="width: 500px">
    <q-card-section class="q-pb-none flex flex-center">
      <q-circular-progress
        show-value
        font-size="0.12em"
        class="q-ma-md"
        :value="progressValue"
        size="160px"
        :thickness="0.4"
        color="blue-8"
        track-color="grey-4"
      >
        <div class="column q-mt-md">
          <div class="row">
            <span class="text-primary text-weight-bold">清洗中</span>
          </div>
          <div class="row flex-center">
            <q-spinner-dots
              color="primary"
              size="2em"
            />
          </div>
        </div>
      </q-circular-progress>
    </q-card-section>

    <q-card-section class="q-pt-none text-center">
      <span class="text-primary" style="font-size: 17px">{{ secondsToMMSS(washingTime) }} / 01:10</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="返回主页" color="primary" @click="onGoHomeBtnClick"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import { useRouter } from "vue-router";

const props = defineProps(["washingTime"]);

const shown = ref(false);

const progressValue = computed(() => {
  return props.washingTime * 100 / 70;
});

const router = useRouter();

const onGoHomeBtnClick = () => {
  router.push("/");
};

</script>

<style lang="scss" scoped>

</style>
