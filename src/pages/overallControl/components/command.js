import { ref } from "vue";
import { sortBy } from "src/utils/array";

export class Command {
  constructor(model) {
    this.model = model;
    this.instructions = ref([]);
    this.id = "";
  }

  add(ins) {
    this.instructions.value.push(ins);
    this.instructions.value.sort(sortBy("time", 1));
  }

  setId(id) {
    this.id = id;
  }

  clear() {
    this.instructions.value.length = 0;
  }

  getInstructions() {
    return this.instructions.value;
  }

  getData() {
    return {
      id: this.id,
      model: this.model,
      instructions: this.instructions.value,
    };
  }
}

export function createSingleInstruction(type, target = 0, action, measure = 0, time = 0) {
  return {
    type: type,
    target: target,
    action: action,
    measures: measure,
    time: time,
    key: Date.now()
  };
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

