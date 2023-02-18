<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import {onMounted} from "vue";

const props = defineProps(["inputPrefix"])
const emit = defineEmits(["keyPress", "change", "clear", "hide"])

let keyboard = null
onMounted(() => {
  keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    preventMouseDownDefault: true,
    layout: {
      default: [
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l {clear}",
        "z x c v b n m {enter}",
      ],
    },
    display: {
      "{bksp}": "删除",
      "{enter}": "隐藏",
      "{clear}": "清空"
    }
  });
  keyboard.setInput(props.inputPrefix)
})

function onChange(input) {
  emit("change", input)
}

function onKeyPress(button) {
  emit("keyPress", button)
  if (button === "{enter}") {
    emit("hide")
  }
  if (button === "{clear}") {
    keyboard.clearInput()
    emit("clear")
  }
}
</script>

<style lang="scss" scoped>

</style>
