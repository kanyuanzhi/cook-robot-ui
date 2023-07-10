import { defineStore } from "pinia";
import { getRunningStatus } from "src/api/runningStatus";
import { getDish } from "src/api/dish";
import { ceil } from "lodash";
import { sortBy } from "src/utils/array";
import { getPhonePairingStatus } from "src/api/systemSettings";

export const UsePairingStateStore = defineStore("pairingState", {
  state: () => ({
    data: {
      pairing_state: 0,
      phone_info: {
        ip: "",
        mac: "",
        hostname: "",
      },
    },

  }),
  getters: {
    getPairingData: (state) => state.data,
  },
  actions: {
    async update() {
      try {
        const res = await getPhonePairingStatus();
        if (res.data.success) {
          this.data = res.data.data;
        } else {
          console.log("disconnect with middle platform");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
