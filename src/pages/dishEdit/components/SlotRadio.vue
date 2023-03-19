<template>
  <q-item dense>
    <q-item-section avatar>{{ label }}</q-item-section>
    <q-item-section>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-radio
            v-for="s in slotOptions"
            :key="s"
            v-model="slot"
            dense
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            :val="s"
            :label="s"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["label", "slotCount"]);

const slot = ref(1);

const slotOptions = [];
for (let i = 1; i < props.slotCount + 1; i++) {
  slotOptions.push(i);
}

const getSlot = ()=>{
  return slot.value
}

defineExpose({
  getSlot
})
</script>

<style lang="scss" scoped>

</style>
