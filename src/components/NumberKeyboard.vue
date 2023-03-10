<template>
    <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { onMounted, ref } from "vue";

const props = defineProps(["defaultInput"])
const emit = defineEmits(["keyPress", "change", "clear", "enter"]);

let keyboard = null;
onMounted(() => {
  keyboard = new Keyboard({
    onChange: (input) => onChange(input),
    onKeyPress: (button) => onKeyPress(button),
    preventMouseDownDefault: true,
    layout: {
      default: [
        "7 8 9",
        "4 5 6",
        "1 2 3",
        "{bksp} 0 {enter}"
      ],
    },
    display: {
      "{bksp}": "删除",
      "{enter}": "提交",
      "{clear}": "clear",
      "{lock}": "caps",
      "{tab}": "tab",
      "{shift}": "shift",
      "{space}": "空格",
    },
  });
  keyboard.setInput(props.defaultInput)
});

function setInputName(name) {
  let layoutName;
  if (["weight", "min", "sec"].indexOf(name) > -1) {
    layoutName = "number";
  } else {
    layoutName = "default";
  }
  keyboard.setOptions({
    inputName: name,
    layoutName: layoutName,
  });
}

function setInput(value) {
  console.log(value)
  keyboard.setInput(value);
}

function onChange(input) {
  emit("change", input);
}

function onKeyPress(button) {
  emit("keyPress", button);
  if (button === "{enter}") {
    emit("enter");
  }
  if (button === "{clear}") {
    keyboard.clearInput();
    emit("clear");
  }
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}

defineExpose({
  setInputName,
  setInput,
});
</script>

<style lang="scss" scoped></style>
