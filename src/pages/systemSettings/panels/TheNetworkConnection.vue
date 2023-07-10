<template>
  <div class="column q-gutter-y-md q-pa-md">
    <div class="col flex flex-center">
      <q-btn-toggle
        v-model="wlanOn"
        class="my-custom-toggle"
        no-caps
        rounded
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          { label: '开启WLAN', value: true },
          { label: '关闭WLAN', value: false },
        ]"
      />
    </div>
    <div class="col row">
      <div class="col-2"></div>
      <div class="col-8">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          style="height: 280px; width: 100%"
        >
          <q-list>
            <q-item
              v-if="in_use_wifi.bssid !== ''"
              clickable
              v-ripple
              class="text-primary text-weight-bold"
              @click="onInUseWifiClick"
            >
              <q-item-section>{{ in_use_wifi.ssid }}</q-item-section>
              <q-item-section>{{ in_use_wifi.bssid }}</q-item-section>
              <q-item-section avatar>
                <q-icon :name="wifiSignalIcon(in_use_wifi.signal)" />
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              v-for="no_use_wifi in no_use_wifi_list"
              :key="no_use_wifi.bssid"
              @click="onNoUseWifiClick(no_use_wifi.bssid)"
            >
              <q-item-section>{{ no_use_wifi.ssid }}</q-item-section>
              <q-item-section>{{ no_use_wifi.bssid }}</q-item-section>
              <q-item-section avatar>
                <q-icon :name="wifiSignalIcon(no_use_wifi.signal)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="col flex flex-center" style="">
      <q-btn
        color="primary"
        rounded
        label="连接隐藏的网络"
        @click="onHiddenWifiBtnClick"
      />
    </div>
    <NetworkConnectionInput
      v-show="false"
      ref="networkConnectionInput"
      :bssid="bssidSelected"
    />
    <NetworkDisconnectionInput
      v-show="false"
      ref="networkDisconnectionInput"
      :ssid="in_use_wifi.ssid"
    />
    <HiddenNetworkConnectionInput
      v-show="false"
      ref="hiddenNetworkConnectionInput"
      :ssid="in_use_wifi.ssid"
    />
  </div>
</template>

<script setup>
import { onUnmounted, reactive, ref, watch } from "vue";
import { getWifiList, toggleWlan } from "src/api/systemSettings";
import { UseSystemStore } from "stores/systemStore";
import NetworkConnectionInput from "pages/systemSettings/components/NetworkConnectionInput";
import NetworkDisconnectionInput from "pages/systemSettings/components/NetworkDisconnectionInput";
import { useQuasar } from "quasar";
import HiddenNetworkConnectionInput from "pages/systemSettings/components/HiddenNetworkConnectionInput";

const $q = useQuasar();
const useSystemStore = UseSystemStore();
const wlanOn = ref(useSystemStore.getWlanStatus !== "unavailable");
const no_use_wifi_list = ref([]);
let in_use_wifi = ref({ ssid: "", bssid: "", signal: "" });

let t;

if (wlanOn.value) {
  t = setInterval(function () {
    getWifiList()
      .then((res) => {
        const data = res.data;
        no_use_wifi_list.value = data.no_use_wifi_list;
        if (JSON.stringify(data.in_use_wifi) !== "{}") {
          useSystemStore.setWlanStatus("connected");
          in_use_wifi.value = data.in_use_wifi;
        } else {
          useSystemStore.setWlanStatus("disconnected");
          in_use_wifi.value = { ssid: "", bssid: "", signal: "" };
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, 3000);
}

watch(wlanOn, async (now) => {
  let res;
  if (now) {
    try {
      res = await toggleWlan(1);
      useSystemStore.setWlanStatus("disconnected");
      t = setInterval(function () {
        getWifiList()
          .then((res) => {
            const data = res.data;
            no_use_wifi_list.value = data.no_use_wifi_list;
            if (JSON.stringify(data.in_use_wifi) !== "{}") {
              useSystemStore.setWlanStatus("connected");
              in_use_wifi.value = data.in_use_wifi;
            } else {
              useSystemStore.setWlanStatus("disconnected");
              in_use_wifi.value = { ssid: "", bssid: "", signal: "" };
            }
          })
          .catch((Error) => {
            console.log(Error);
          });
      }, 3000);
    } catch (e) {
      $q.notify({
        message: e.message,
        timeout: 3000,
        position: "top",
      });
    }
  } else {
    try {
      res = await toggleWlan(0);
      no_use_wifi_list.value = [];
      in_use_wifi.value = { ssid: "", bssid: "", signal: "" };
      useSystemStore.setWlanStatus("unavailable");
      clearInterval(t);
    } catch (e) {
      $q.notify({
        message: e.message,
        timeout: 3000,
        position: "top",
      });
    }
  }
  console.log(res);
});

const networkConnectionInput = ref(null);
const bssidSelected = ref("");
function onNoUseWifiClick(bssid) {
  networkConnectionInput.value.open();
  bssidSelected.value = bssid;
}

const networkDisconnectionInput = ref(null);
function onInUseWifiClick() {
  networkDisconnectionInput.value.open();
}

const hiddenNetworkConnectionInput = ref(null);
function onHiddenWifiBtnClick() {
  hiddenNetworkConnectionInput.value.open();
}

function wifiSignalIcon(signal) {
  const signalInt = parseInt(signal);
  if (signalInt > 74) return "signal_wifi_statusbar_4_bar";
  else if (signalInt > 49) return "network_wifi_3_bar";
  else if (signalInt > 49) return "network_wifi_2_bar";
  else return "network_wifi_1_bar";
}

onUnmounted(() => {
  clearInterval(t);
});

// window.ipcRenderer.send("SEND", "123123")

const contentStyle = reactive({
  // borderStyle: "solid",
  // borderColor: "rgba(0,0,0,0.1)",
  // borderWidth: "1px",
  backgroundColor: "rgba(0,0,0,0.02)",
  color: "#555",
});

const thumbStyle = reactive({
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
});

const barStyle = reactive({
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
});
</script>

<style lang="scss" scoped></style>
