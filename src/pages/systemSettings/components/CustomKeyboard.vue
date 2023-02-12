<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import {onMounted} from "vue";

const props = defineProps([""])
const emit = defineEmits(["keyPress", "change", "clear", "connect"])

let keyboard = null
onMounted(() => {
  keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    preventMouseDownDefault: true,
    layout: {
      default: [
        '` 1 2 3 4 5 6 7 8 9 0 - =',
        'q w e r t y u i o p [ ] \\',
        "a s d f g h j k l ; '",
        'z x c v b n m , . /',
        '{clear} {bksp} {lock} {enter}',
      ],
      // shift布局
      shift: [
        '~ ! @ # $ % ^ & * ( ) _ +',
        'Q W E R T Y U I O P { } |',
        'A S D F G H J K L : "',
        'Z X C V B N M &lt; &gt; ?',
        '{clear} {bksp} {lock} {enter}',
      ],
    },
    display: {
      "{bksp}": "删除",
      "{enter}": "连接",
      "{clear}": "清空",
      '{lock}': '大写',
      '{tab}': 'tab',
      '{shift}': 'shift',
    }
  });
})

function onChange(input) {
  emit("change", input)
}

function onKeyPress(button) {
  emit("keyPress", button)
  if (button === "{enter}") {
    emit("connect")
  }
  if (button === "{clear}") {
    keyboard.clearInput()
    emit("clear")
  }
  if (button === '{shift}' || button === '{lock}') {
    const currentLayout = keyboard.options.layoutName
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
    keyboard.setOptions({
      layoutName: shiftToggle,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
