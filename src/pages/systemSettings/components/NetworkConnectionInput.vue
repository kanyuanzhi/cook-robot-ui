<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide">
      <q-card style="min-width: 350px">
        <q-card-section class="q-pb-none">
          <div class="text-subtitle2">输入网络安全秘钥</div>
        </q-card-section>

        <q-card-section class="q-py-none">
          <q-input dense v-model="password" autofocus @keyup.enter="onConnectionBtnClick"/>
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

const props = defineProps(["bssid"])

defineExpose({
  open,
  close
})

const password = ref("")
const shown = ref(false)

function onChange(input) {
  password.value = input
}

function onHide() {
  password.value = ""
}

function open() {
  shown.value = true
}

function close() {
  shown.value = false
}

function onConnectionBtnClick() {
  connectWifi(1, {bssid: props.bssid, password: password.value}).then(res => {
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
