import { defineStore } from "pinia";

export const UseRunningStore = defineStore("running", {
  state: () => ({
    isRunning: false,
    runningTime: 0,
    dish: {},
    isSelected: false,
    isFinished: false,
    isWashing: false,
    stepValue: 0,
  }),
  getters: {
    getRunningStatus: (state) => state.isRunning,
    getRunningTime: (state) => state.runningTime,
    getDish: (state) => state.dish,
    getIsSelected: (state) => state.isSelected,
    getIsFinished: (state) => state.isFinished,
    getWashStatus: (state) => state.isWashing,
    getStepValue: (state) => state.stepValue,
  },
  actions: {
    setRunningStatus(status) {
      this.isRunning = status;
    },
    setRunningTime(status) {
      this.runningTime = status;
    },
    setDish(status) {
      this.dish = status;
    },
    setSelectedStatus(status) {
      this.isSelected = status;
    },
    setFinishedStatus(status) {
      this.isFinished = status;
    },
    setWashStatus(status) {
      this.isWashing = status;
    },
    setStepValue(status) {
      this.stepValue = status;
    }

  },
});
