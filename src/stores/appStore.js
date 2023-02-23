import { defineStore } from "pinia";

export const UseAppStore = defineStore("app", {
  state: () => ({
    subPageTitle: "",
  }),
  getters: {
    getSubPageTitle: (state) => state.subPageTitle,
  },
  actions: {
    setSubPageTitle(title) {
      this.subPageTitle = title;
    },
  },
});
