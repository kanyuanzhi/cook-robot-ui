<template>
  <div class="column q-gutter-y-md q-pa-md">
    <div class="col flex flex-center">
      <q-btn-toggle
        v-model="wifiOn"
        class="my-custom-toggle"
        no-caps
        rounded
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: '开启WLAN', value: true},
          {label: '关闭WLAN', value: false}
        ]"
      />
    </div>
    <div class="col row">
      <div class="col-3">网络列表</div>
      <div class="col-6">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          style="height: 300px; width: 100%;"
        >
          <div v-for="n in 10" :key="n" class="q-pa-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </q-scroll-area>
      </div>
      <div class="col-3"></div>

    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";

const wifiOn = ref(true)

window.ipcRenderer.send("SEND", "123123")

const contentStyle = reactive({
  backgroundColor: 'rgba(0,0,0,0.02)',
  color: '#555'
},)

const thumbStyle = reactive({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.75
})

const barStyle = reactive({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2
})
</script>

<style lang="scss" scoped>

</style>
