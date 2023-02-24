<template>
  <q-dialog v-model="shown">
    <q-card class="column" style="width: 300px">
      <q-card-section>
        <div class="text-subtitle1">选择食材种类</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-list separator padding>
          <q-scroll-area style="height: 400px; max-width: 300px;">
            <q-item v-for="opt in options" :key="opt.id" clickable v-ripple @click="onSelect($event, opt.name)">
              <q-item-section>{{ opt.name }}</q-item-section>
            </q-item>
          </q-scroll-area>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getIngredients, getShapes } from "src/api/ingredient";

const emit = defineEmits(["select"]);

const shown = ref(false);
const options = ref([]);

const show = () => {
  shown.value = true;
  getIngredients()
    .then(res => {
      options.value = res.data;
    });
};

const onSelect = (e, val) => {
  emit("select", val);
  shown.value = false;
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
