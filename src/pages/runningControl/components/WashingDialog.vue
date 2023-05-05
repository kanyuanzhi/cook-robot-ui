<template>
  <q-dialog v-model="shown" persistent>
    <q-card style="width: 500px" class="q-px-sm">
      <q-card-section>
        <div class="text-h6 text-center">清洗中</div>
      </q-card-section>
      <!--      <GearSlider ref="gearSlider" label="档位" color="red-14" :gear-min="0" :gear-max="10"/>-->

      <!--      <TimeSelect ref="timeSelect"/>-->

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="">停止</q-btn>
        <!--        <q-btn flat color="primary" @click="onSubmit">提交</q-btn>-->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const shown = ref(false);

const show = () => {
  shown.value = true;
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
