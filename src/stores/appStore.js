import { defineStore } from "pinia";

export const UseAppStore = defineStore("app", {
  state: () => ({
    subPageTitle: "",
    editedDish: {},
    isEditedDishEmpty: true
  }),
  getters: {
    getSubPageTitle: (state) => state.subPageTitle,
    getEditedDish: (state) => state.editedDish,
    getEditedDishStatus: (state) => state.isEditedDishEmpty,
  },
  actions: {
    setSubPageTitle(title) {
      this.subPageTitle = title;
    },
    setEditedDish(dish) {
      this.editedDish = dish;
      this.isEditedDishEmpty = false
    },
    clearEditedDish() {
      this.editedDish = {};
      this.isEditedDishEmpty = true
    },
  },
});
