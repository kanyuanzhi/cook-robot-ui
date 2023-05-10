import { defineStore } from "pinia";
import { getRunningStatus } from "src/api/runningStatus";
import { getDish } from "src/api/dish";
import { ceil } from "lodash";
import { sortBy } from "src/utils/array";

export const UseStateMachineStore = defineStore("stateMachine", {
  state: () => ({
    data: {
      id: "00000000-0000-0000-0000-000000000000",
      time: 0,
      machine_state: 0,
      washing_state: 0,

      y_reset_control_word: 0,
      y_set_control_word: 0,
      y_set_target_position: 0,
      y_set_real_position: 0,
      y_set_total_distance: 0,
      y_set_rotate_speed: 0,

      y_position_0: 0,

      x_reset_control_word: 0,
      x_set_control_word: 0,
      x_set_target_position: 0,
      x_set_real_position: 0,
      x_set_total_distance: 0,
      x_set_move_speed: 0,

      r_control_word: 0,
      r_rotate_mode: 0,
      r_rotate_speed: 0,
      r_rotate_number: 0,

      shake_control_word: 0,
      shake_current_number: 0,
      shake_total_number: 0,
      shake_up_speed: 0,
      shake_down_speed: 0,

      liquid_pump_control_word: 0,
      liquid_pump_number: 0,
      liquid_pump_time: 0,

      water_pump_control_word: 0,
      water_pump_number: 0,
      water_pump_time: 0,

      solid_pump_control_word: 0,
      solid_pump_number: 0,
      solid_pump_time: 0,

      temperature_control_word: 0,
      temperature_target_number: 0,
      temperature_current_number: 0,
      temperature_up_number: 0,
      temperature_down_number: 0,
      temperature_warning: 0,
      temperature_infrared_number: 0,

      emergency: 0,
    },

    runningTime: 0,
    washingTime: 0,

    dish: {},
    sortedDishSteps: [],
    currentStepNumber: 0,

    isDishSetOnce: false,
    isDishSelected: false,
    isNewDishSelected: false,
    isCookFinished: false,
    isMachineRunning: false,

    isMachineWashing: false,

    stopUpdateFlag: false
  }),
  getters: {
    getStateData: (state) => state.data,

    getRunningTime: (state) => state.runningTime,
    getWashingTime: (state) => state.washingTime,

    getDish: (state) => state.dish,
    getSortedDishSteps: (state) => state.sortedDishSteps,
    getCurrentStepNumber: (state) => state.currentStepNumber,

    getDishSelectedState: (state) => state.isDishSelected,
    getNewDishSelectState: (state) => state.isNewDishSelected,
    getCookFinishedState: (state) => state.isCookFinished,
    getMachineRunningState: (state) => state.isMachineRunning,
    getMachineWashingState: (state) => state.isMachineWashing,
  },
  actions: {
    async update() {
      if (this.stopUpdateFlag) return;
      try {
        const res = await getRunningStatus();
        if (res.data.success) {
          this.data = res.data.data;
          if (this.data.id !== "00000000-0000-0000-0000-000000000000") {
            this.isDishSelected = true;
            if (this.isDishSetOnce === false) {
              const res = await getDish(this.data.id);
              this.dish = res.data;
              this.setSortedDishSteps(res.data.steps);
              this.isDishSetOnce = true;
            }
          }
          if (this.data.machine_state === 2) { // 正在运行
            this.isNewDishSelected = false;
            if (this.data.washing_state === 0) { // 非清洗
              this.isCookFinished = false;
              this.isMachineRunning = true;
              this.runningTime = ceil(this.data.time / 10);
              this.setCurrentStepNumber(this.runningTime)
              // if (this.isDishSelected === false) { // 没有选择菜品才会查询菜品信息
              //   const res = await getDish(id.value);
              //   this.dish = res.data;
              // } else {
              //   // 已选择菜品
              // }
            } else {
              // 清洗中
              this.isMachineWashing = true;
              this.washingTime = ceil(this.data.time / 10);
            }
          } else { // 空闲
            this.isMachineRunning = false;
            this.isMachineWashing = false;
            if (this.data.id !== "00000000-0000-0000-0000-000000000000") {
              if (this.isNewDishSelected !== true) {
                this.isCookFinished = true;
                this.runningTime = this.dish.cook_time;
                this.setCurrentStepNumber(this.runningTime)
              } else {
                this.isCookFinished = false;
              }
            }
          }
        } else {
          console.log("disconnect with middle platform");
        }
      } catch (e) {
        console.log(e);
      }
    },
    setDish(status) {
      this.dish = status;

      this.setSortedDishSteps(status.steps);
      this.currentStepNumber = 0

      this.isDishSetOnce = true;
      this.isDishSelected = true;
      this.isNewDishSelected = true;
      this.isCookFinished = false;
      this.runningTime = 0;
      this.washingTime = 0;
    },
    setMachineRunningState(status) {
      this.isMachineRunning = status;
      this.stopUpdateFlag = true;
      setTimeout(() => this.stopUpdateFlag = false, 500);
    },
    setMachineWashingState(status) {
      this.isMachineWashing = status;
      this.washingTime = 0;
      this.stopUpdateFlag = true;
      setTimeout(() => this.stopUpdateFlag = false, 500);
    },
    setSortedDishSteps(steps) {
      this.sortedDishSteps = [];
      for (const key in steps) {
        this.sortedDishSteps.push(...steps[key]);
      }
      this.sortedDishSteps.sort(sortBy("time", 1));
    },
    setCurrentStepNumber(runningTime) {
      for (let i = 0; i < this.sortedDishSteps.length - 1; i++) {
        if (runningTime >= this.sortedDishSteps[i].time && runningTime < this.sortedDishSteps[i + 1].time) {
          this.currentStepNumber = i;
          return;
        }
      }
      this.currentStepNumber = this.sortedDishSteps.length - 1;
    }
  },
});
