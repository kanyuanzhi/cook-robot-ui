<template>
  <q-icon class="q-mr-sm" size="24px" :name="wlanIcon"></q-icon>
  <!--  <q-btn flat round dense :icon=wlanIcon class="q-mr-sm"/>-->
</template>

<script setup>
import { UseSystemStore } from "stores/systemStore";
import { ref, watch } from "vue";

const useSystemStore = UseSystemStore();
const wlanStatus = ref("");
const wlanIcon = ref("wifi_tethering_error");

watch(
  useSystemStore.$state,
  (state) => {
    wlanStatus.value = state.wlanStatus;
    switch (wlanStatus.value) {
      case "unavailable":
        wlanIcon.value = "wifi_off";
        return;
      case "disconnected":
        wlanIcon.value = "perm_scan_wifi";
        return;
      case "connected":
        wlanIcon.value = "wifi";
        return;
      default:
        wlanIcon.value = "wifi_tethering_error";
        return;
    }
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped></style>
