<template>
  <div>
    <div class="text-h6 q-mb-md">{{ props.title }}</div>
    <q-separator/>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style lang="scss" scoped>

</style>
