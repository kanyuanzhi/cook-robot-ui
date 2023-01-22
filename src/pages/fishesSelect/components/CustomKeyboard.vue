<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import {onMounted} from "vue";

const props = defineProps(["inputPrefix"])
const emit = defineEmits(["keyPress", "change", "clear", "search"])

let keyboard = null
onMounted(() => {
  console.log(213321)
  keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    preventMouseDownDefault: true,
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{clear} z x c v b n m {bksp}",
        "{enter}"
      ],
    },
    display: {
      "{bksp}": "删除",
      "{enter}": "搜索",
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
    emit("search")
  }
  if (button === "{clear}") {
    keyboard.clearInput()
    emit("clear")
  }
}
</script>

<style lang="scss" scoped>

</style>
