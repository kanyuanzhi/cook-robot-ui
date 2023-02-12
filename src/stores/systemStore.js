import {defineStore} from 'pinia';

export const UseSystemStore = defineStore('system', {
  state: () => ({
    wlanStatus: "",
    wifiSSID: "",
    signal: "",
    qrScanText: ""
  }),
  getters: {
    getWlanStatus: (state) => state.wlanStatus,
    getQrScanText: (state) => state.qrScanText,
  },
  actions: {
    setWlanStatus(status) {
      this.wlanStatus = status
    },
  },
});
