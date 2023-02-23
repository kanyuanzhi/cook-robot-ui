<template>
  <div>
    <q-btn round :color="color" :icon="icon" size="30px" @click="onClick">
    </q-btn>
    <q-dialog v-model="showing" persistent>
      <q-card style="width: 40%">
        <q-card-section class="row items-center">
          <q-avatar
            icon="report_problem"
            :color="color"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm text-h6">确认{{ operationText }}炒菜？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="取消" color="primary" v-close-popup />
          <q-btn
            :label="operationText"
            :color="color"
            @click.prevent="onConfirm"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["icon", "color", "operationText"]);

const showing = ref(false);

function onClick() {
  showing.value = true;
}

const emit = defineEmits(["confirm"]);

function onConfirm() {
  emit("confirm");
}
</script>

<style scoped></style>
