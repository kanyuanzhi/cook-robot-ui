import { ref } from "vue";
import { sortBy } from "src/utils/array";

export function createSingleInstruction(type, target, action, measure, time) {
  return {
    type: type,
    target: target | 0,
    action: action,
    measure: measure | 0,
    time: time | 0,
    key: Date.now()
  };
}

export class Command {
  constructor(model) {
    this.model = model;
    this.instructions = ref([]);
  }

  add(ins) {
    this.instructions.value.push(ins);
    this.instructions.value.sort(sortBy("time", 1));
  }

  clear() {
    this.instructions.value.length = 0;
  }

  getInstructions() {
    return this.instructions.value;
  }

  getData() {
    return {
      model: this.model,
      instructions: this.instructions.value
    };
  }
}

export function createPLCInstruction(type, target = 0, action, measures = []) {
  return {
    type: type,
    target: target,
    action: action,
    measures: measures,
    time: 0,
    key: Date.now()
  };
}

