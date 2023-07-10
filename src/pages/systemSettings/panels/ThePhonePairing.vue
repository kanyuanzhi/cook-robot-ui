<template>
  <div class="column q-gutter-y-md q-pa-md">
    <div v-if="pairing_state === 0" class="col flex flex-center" style="">
      <q-btn
        color="primary"
        rounded
        label="开始配对"
        @click="togglePairing(1)"
      />
    </div>
    <div v-if="pairing_state !== 0" class="col flex flex-center" style="">
      <q-btn
        color="primary"
        rounded
        label="停止配对"
        @click="togglePairing(0)"
      />
    </div>
    <div class="col-1 flex flex-center" style="">
      <q-card flat class="my-card" style="width: 50%">
        <q-card-section class="bg-grey-2 text-primary" style="min-height: 100px">
          <div v-if="pairing_state===2" class="row justify-between">
            <span class="col text-subtitle1 text-left">{{ hostname }}</span>
            <span class="col text-subtitle1 text-right">{{ ip }}</span>
          </div>
          <div v-else class="row justify-between text-center">
            <q-spinner-rings
              class="col"
              color="primary"
              size="4em"
            />
          </div>
        </q-card-section>
        <q-card-actions class="bg-grey-3" align="right">
          <q-btn
            color="primary"
            flat
            label="确认配对"
            :disable="pairing_state!==2"
            @click="togglePairing(2)"
          />
          <q-btn
            color="primary"
            flat
            label="取消配对"
            :disable="pairing_state!==2"
            @click="togglePairing(3)"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col flex flex-center" style="">

    </div>
    <div class="col flex flex-center" style="">

    </div>
  </div>
</template>

<script setup>

import { togglePhonePairing } from "src/api/systemSettings";
import { UsePairingStateStore } from "stores/pairingStateStore";
import { onUnmounted, ref } from "vue";

const togglePairing = async (flag) => {
  const res = await togglePhonePairing(flag);
};

const usePairingStateStore = UsePairingStateStore();

const pairing_state = ref(usePairingStateStore.getPairingData.pairing_state);
const hostname = ref(usePairingStateStore.getPairingData.phone_info.hostname);
const ip = ref(usePairingStateStore.getPairingData.phone_info.ip);

usePairingStateStore.update();
setInterval(() => {
  usePairingStateStore.update();
}, 1000);

usePairingStateStore.$subscribe(async (mutation, state) => {
  pairing_state.value = state.data.pairing_state;
  hostname.value = state.data.phone_info.hostname;
  ip.value = state.data.phone_info.ip;
  console.log(state.data.pairing_state, state.data.phone_info);
});

onUnmounted(()=>{
  togglePhonePairing(0)
})
</script>

<style lang="scss" scoped></style>
