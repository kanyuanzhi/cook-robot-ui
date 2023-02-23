<template>
  <div class="q-mr-sm text-subtitle1 text-weight-bold">
    <span>{{ current_time }}</span>
  </div>
  <!--  <q-btn flat round dense :icon=wlanIcon class="q-mr-sm"/>-->
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";

const timeStamp = Date.now();
const current_time = ref(date.formatDate(timeStamp, "HH:mm:ss"));

setInterval(function () {
  const timeStamp = Date.now();
  current_time.value = date.formatDate(timeStamp, "HH:mm:ss");
}, 500);
</script>

<style lang="scss" scoped></style>
