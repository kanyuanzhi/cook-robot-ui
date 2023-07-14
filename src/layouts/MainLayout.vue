<template>
  <!--  <q-layout view="lHh Lpr lFf" :class="{'cursor-none': cursorNone}">-->
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-electron-drag">
      <div class="row">
        <q-toolbar class="col-4">
          <q-btn flat round dense icon="home" to="/"/>
          <q-toolbar-title>Cook Robot</q-toolbar-title>
          <q-space/>
        </q-toolbar>
        <q-toolbar class="col-4">
          <q-space/>
          <q-toolbar-title style="text-align: center">{{
              subPage
            }}
          </q-toolbar-title>
          <q-space/>
        </q-toolbar>
        <q-toolbar class="col-4">
          <q-space/>
          <TimeDisplay/>
          <q-btn-dropdown flat round dense dropdown-icon="more_vert">
            <q-list class="bg-primary text-white">
              <q-item class="dropdown-bottom-border" clickable v-close-popup @click="operateScreen('minimize')">
                <q-item-section side>
                  <q-icon name="remove" color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>最小化</q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="dropdown-bottom-border" clickable v-close-popup @click="operateScreen('toggle-screen')">
                <q-item-section side>
                  <q-icon :name="isFullscreen ?'fullscreen_exit' : 'fullscreen'" color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ isFullscreen ? "退出全屏" : "全屏" }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="operateScreen('close')">
                <q-item-section side>
                  <q-icon name="close" color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>退出程序</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </div>
    </q-header>

    <!--    <q-drawer-->
    <!--      v-model="leftDrawerOpen"-->
    <!--      show-if-above-->
    <!--      bordered-->
    <!--    >-->
    <!--      <q-list>-->
    <!--        <q-item-label-->
    <!--          header-->
    <!--        >-->
    <!--          Essential Links-->
    <!--        </q-item-label>-->

    <!--        <EssentialLink-->
    <!--          v-for="link in essentialLinks"-->
    <!--          :key="link.title"-->
    <!--          v-bind="link"-->
    <!--        />-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <router-view/>
    </q-page-container>

    <QrScanDialog ref="qrScanDialog" :text="qrScanText"/>
  </q-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { UseAppStore } from "stores/appStore";
import { UseSystemStore } from "stores/systemStore";
import WlanIcon from "layouts/components/WlanIcon";
import { getSystemStatus } from "src/api/systemStatus";
import QrScanDialog from "layouts/components/QrScanDialog";
import TimeDisplay from "layouts/components/TimeDisplay";
import { useQuasar } from "quasar";
import { UseStateMachineStore } from "stores/stateMachineStore";

const $q = useQuasar();

const cursorNone = $q.platform.is.cros || $q.platform.is.electron;

const useAppStore = UseAppStore();
const subPage = ref("");

const isFullscreen = ref(false);
if (process.env.MODE === "electron") {
  isFullscreen.value = window.myWindowAPI.isFullscreen();
}

watch(
  useAppStore.$state,
  (state) => {
    subPage.value = state.subPageTitle;
  },
  {
    deep: true,
  }
);

const qrScanDialog = ref(null);
const qrScanText = ref("");

const useStateMachine = UseStateMachineStore();
setInterval(() => {
  // useStateMachine.update();
}, 1000);

const useSystemStore = UseSystemStore();
// setInterval(function () {
//   getSystemStatus().then(res => {
//     console.log(res.data)
//     useSystemStore.setWlanStatus(res.data.wlan.status)
//     if (res.data.qr_scan_data.is_new) {
//       qrScanText.value = res.data.qr_scan_data.text
//       qrScanDialog.value.open()
//     }
//   }).catch(Error => {
//     console.log(Error)
//   })
// }, 1000)

const operateScreen = (flag) => {
  if (process.env.MODE !== "electron") return;
  switch (flag) {
    case "minimize":
      window.myWindowAPI.minimize();
      return;
    case "fullscreen":
      window.myWindowAPI.toggle();
      return;
    case "quit-fullscreen":
      window.myWindowAPI.toggle();
      return;
    case "close":
      window.myWindowAPI.close();
      return;
    case "toggle-screen":
      window.myWindowAPI.toggle();
      isFullscreen.value = window.myWindowAPI.isFullscreen();
      return;
    default:
      return;
  }
};
</script>

<style lang="scss" scoped>
.dropdown-bottom-border {
  border-bottom: 1px gainsboro solid;
}
</style>
