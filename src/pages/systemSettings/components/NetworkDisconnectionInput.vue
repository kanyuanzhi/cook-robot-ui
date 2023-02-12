<template>
  <div>
    <q-dialog v-model="shown">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-subtitle2">是否断开当前连接？</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup/>
          <q-btn flat label="断开" v-close-popup @click="onDisconnectionBtnClick"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {disconnectWifi} from "src/api/systemSettings";


const props = defineProps(["ssid"])

defineExpose({
  open,
  close
})

const shown = ref(false)

function open() {
  shown.value = true
}

function close() {
  shown.value = false
}

function onDisconnectionBtnClick() {
  disconnectWifi(0, {ssid: props.ssid}).then(res => {

  })
  shown.value = false
}
</script>

<style lang="scss" scoped>

</style>
