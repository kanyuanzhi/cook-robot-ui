import {defineStore} from 'pinia';

export const UseRunningStore = defineStore('running', {
  state: () => ({
    dishesName: "菜品1",
    isRunning: false
  }),
  getters: {
    getDishesName: (state) => state.dishesName,
    getRunningStatus: (state) => state.isRunning,
  },
  actions: {
    setRunningStatus(status) {
      this.isRunning = status
    },
  },
});
