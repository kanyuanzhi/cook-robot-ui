<template>
  <div>
    <q-dialog v-model="shown" persistent @hide="onHide">
      <q-card style="width: 400px" class="q-px-sm">
        <q-card-section>
          <div class="text-h6">添加食材</div>
        </q-card-section>
        <q-item dense>
          <q-item-section avatar>种类</q-item-section>
          <q-item-section>
            <q-input
              v-model="name"
              filled
              dense
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" @click="theIngredientNameSelectionDialog.show()"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section avatar>形状</q-item-section>
          <q-item-section>
            <q-input
              v-model="shape"
              filled
              dense
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" @click="theIngredientShapeSelectionDialog.show()"/>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <NumberSelect ref="numberSelect" label="分量" unit="克（毫升）" :min="0" :max="220" :step="5"
                      :number="weight" @update="(v)=>weight=v"/>

        <SlotRadio ref="slotRadio" :slotNumber="slotNumber" label="菜盒" :slot-count="4" @update="(v)=>slotNumber=v"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--    <q-dialog-->
    <!--      v-model="shown"-->
    <!--      persistent-->
    <!--      position="bottom"-->
    <!--      no-focus-->
    <!--      no-refocus-->
    <!--      seamless-->
    <!--      full-width-->
    <!--    >-->
    <!--      <CustomKeyboard ref="customKeyboard" @change="onChange" @enter="onSubmit"/>-->
    <!--    </q-dialog>-->
    <TheIngredientNameSelectionDialog ref="theIngredientNameSelectionDialog" @select="(val)=>name=val"/>
    <TheIngredientShapeSelectionDialog ref="theIngredientShapeSelectionDialog" @select="(val)=>shape=val"/>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import TheIngredientNameSelectionDialog from "pages/dishEdit2/components/dialogs/TheIngredientNameSelectionDialog.vue";
import TheIngredientShapeSelectionDialog from "pages/dishEdit2/components/dialogs/TheIngredientShapeSelectionDialog.vue";
import SlotRadio from "pages/dishEdit2/components/SlotRadio.vue";
import NumberSelect from "pages/dishEdit2/components/select/NumberSelect.vue";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const name = ref("");
const shape = ref("");
const weight = ref(0);
const slotNumber = ref("1");

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
  // setTimeout(() => {
  //   if (step !== undefined) {
  //     isUpdate = true;
  //     stepIndex = index;
  //     name.value = step.name;
  //     shape.value = step.shape;
  //     weightSelect.value.setWeight(step.weight);
  //     slotRadio.value.setSlot(step.slot);
  //     timeSelect.value.setTime(step.time);
  //   }
  // }, 100);
};

const theIngredientNameSelectionDialog = ref(null);
const theIngredientShapeSelectionDialog = ref(null);

const onSubmit = () => {
  try {
    const newStep = {
      name: name.value,
      shape: shape.value,
      weight: weight.value,
      slotNumber: slotNumber.value,
      key: Date.now(),
      type: "ingredient"
    };
    if (isUpdate) {
      emits("update", newStep, stepIndex);
    } else {
      emits("submit", newStep);
    }
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onHide = () => {
  name.value = "";
  shape.value = "";
  weight.value = 0;
  slotNumber.value = "1";
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
