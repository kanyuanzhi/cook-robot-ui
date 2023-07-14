<template>
  <q-item dense>
    <q-item-section avatar>种类</q-item-section>
    <q-item-section>
      <q-select
        dense
        options-dense
        filled
        v-model="selectedSeasoning"
        :options="seasoningOptions"
        options-cover
        stack-label
      >
        <!--        <template v-slot:selected>-->
        <!--          {{seasoning.label}}-->
        <!--        </template>-->
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps(["seasoning"]);
const emits = defineEmits(["update"])

const selectedSeasoning = ref(props.seasoning)

watch(selectedSeasoning,(value)=>{
  emits("update", value)
})

const seasoningOptions = ref([
  {
    label: "食用油",
    pump: 1,
  }, {
    label: "酱油",
    pump: 2,
  }, {
    label: "老抽",
    pump: 3
  }, {
    label: "醋",
    pump: 4
  }, {
    label: "料酒",
    pump: 5
  }, {
    label: "待定（液体）",
    pump: 6
  }, {
    label: "水",
    pump: 7
  }, {
    label: "盐",
    pump: 9
  }, {
    label: "待定（固体）",
    pump: 10
  }
]);
</script>

<style lang="scss" scoped>

</style>
