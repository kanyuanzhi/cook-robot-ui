<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide">
      <q-card style="min-width: 350px">
        <q-card-section class="q-py-md">
          <div class="text-subtitle2 text-center">输入隐藏网络信息</div>
        </q-card-section>

        <q-card-section class="q-py-none">
          <q-input ref="sidInput" dense v-model="ssid" label="网络名称" autofocus
                   @keyup.enter="onConnectionBtnClick" @focus="onInputFocus(e, 'ssid')"
                   @input="onInputChange(e, 'ssid')"/>
          <q-input ref="passwordInput" dense v-model="password" label="安全密钥"
                   @keyup.enter="onConnectionBtnClick" @focus="onInputFocus(e, 'password')"
                   @input="onInputChange(e, 'password')"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup/>
          <q-btn flat label="连接" v-close-popup @click="onConnectionBtnClick"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="shown" no-focus no-refocus seamless full-width position="bottom">
      <CustomKeyboard ref="customKeyboard" @change="onChange" @connect="onConnectionBtnClick"/>
    </q-dialog>
  </div>
</template>

<script setup>
import CustomKeyboard from "pages/systemSettings/components/CustomKeyboard"
import {ref} from "vue"
import {connectWifi} from "src/api/systemSettings";
import {useQuasar} from 'quasar'

const $q = useQuasar()

defineExpose({
  open,
  close
})

const ssid = ref("")
const password = ref("")
const shown = ref(false)

const customKeyboard = ref(null)


function onInputFocus(e, name) {
  customKeyboard.value.setInputName(name)
}

function onInputChange(e, name) {
  customKeyboard.value.setInput(e.target.value, name)
}

function onChange(input, name) {
  if (name === "ssid") ssid.value = input
  else password.value = input
}

function onHide() {
  ssid.value = ""
  password.value = ""
}

function open() {
  shown.value = true
}

function close() {
  shown.value = false
}

function onConnectionBtnClick() {
  connectWifi(1, {bssid: ssid.value, password: password.value}).then(res => {
    if (res.data.indexOf("success") !== -1) {
      $q.notify({
        type: "positive",
        message: "连接成功",
        timeout: 3000,
        position: "top"
      })
    } else {
      $q.notify({
        type: "warning",
        message: "连接失败，请重试",
        timeout: 3000,
        position: "top"
      })
    }
  })
  shown.value = false
}
</script>

<style lang="scss" scoped>

</style>
