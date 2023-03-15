import { defineStore } from "pinia";

export const UseRunningStore = defineStore("running", {
  state: () => ({
    dishesName: "菜品1",
    isRunning: false,
    dish: {}
  }),
  getters: {
    getDishesName: (state) => state.dishesName,
    getRunningStatus: (state) => state.isRunning,
    getDish: (state) => state.dish,
  },
  actions: {
    setRunningStatus(status) {
      this.isRunning = status;
    },
    setDish(status) {
      this.dish = status;
    }
  },
});
