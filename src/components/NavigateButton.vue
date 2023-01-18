<template>
  <div :class="colSize" class="navigate-button-wrap">
    <q-btn :to="to" :class="[fontSizeClass, fontWeightClass]" class="fit" square :color="color">
      <slot></slot>
    </q-btn>
  </div>
</template>

<script setup>
const props = defineProps([
  "colSize",
  "color",
  "fontSizeClass",
  "fontWeightClass",
  "to"])
</script>

<style lang="scss" scoped>
.navigate-button-wrap {
  height: 200px;
  padding: 10px;
}

.large{
  font-size: 2em;
}
</style>
