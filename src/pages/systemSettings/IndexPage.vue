<template>
  <q-page>
    <div class="row q-pa-md">
      <q-splitter
        class="full-width"
        v-model="splitterModel"
        style="height: 500px"
      >
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-grey-9"
            indicator-color="primary"
          >
            <q-tab name="profile" icon="person_outline" label="用户信息"/>
            <q-tab name="network" icon="cast_connected" label="网络连接"/>
            <q-tab name="phone" icon="link" label="手机配对"/>
            <q-tab name="update" icon="update" label="软件更新"/>
            <q-tab name="power" icon="power_settings_new" label="关机重启"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="profile">
              <SettingPanel title="用户信息"></SettingPanel>
            </q-tab-panel>
            <q-tab-panel name="network">
              <SettingPanel title="网络连接"><NetworkConnection/></SettingPanel>
            </q-tab-panel>
            <q-tab-panel name="phone">
              <SettingPanel title="手机配对"/>
            </q-tab-panel>
            <q-tab-panel name="update">
              <SettingPanel title="软件更新"/>
            </q-tab-panel>
            <q-tab-panel name="power">
              <SettingPanel title="关机重启"/>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import {UseAppStore} from "stores/appStore";
import {ref} from "vue";
import SettingPanel from "pages/systemSettings/components/SettingPanel";
import NetworkConnection from "pages/systemSettings/components/NetworkConnection";

const useAppStore = UseAppStore()
useAppStore.setSubPageTitle("系统设置")

const splitterModel = ref(20)
const tab = ref("profile")
</script>

<style lang="scss" scoped>

</style>
