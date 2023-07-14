<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-8">
          <q-card bordered flat class="my-card" style="width: 100%">
            <q-card-section class="text-center">
              <div class="text-subtitle1">步骤</div>
            </q-card-section>
            <q-separator inset/>
            <q-card-section>
              <q-scroll-area class="bg-amber-1" style="height: 425px;">
                <q-list ref="stepList" bordered separator>
                  <q-slide-item v-for="(step, index) in steps" :key="step.key" class="text-black"
                                @right="onDelete(index)" right-color="red">
                    <template v-slot:right>
                      <q-icon name="delete"/>
                    </template>
                    <q-item>
                      <template v-if="step.type==='ingredient'">
                        <q-item-section avatar>
                          <q-avatar rounded color="green" text-color="white" icon="fa-solid fa-wheat-awn" size="md"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{
                              index + 1 + ". 加" + step.name + step.weight + "克，使用菜盒" + step.slotNumber
                              }}
                          </q-item-label>
                        </q-item-section>
                      </template>
                      <template v-if="step.type==='water'">
                        <q-item-section avatar>
                          <q-avatar rounded color="blue" text-color="white" icon="water_drop" size="md"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{
                              index + 1 + ". 加" + step.name + step.weight + "克"
                            }}
                          </q-item-label>
                        </q-item-section>
                      </template>
                      <template v-if="step.type==='oil'">
                        <q-item-section avatar>
                          <q-avatar rounded color="orange" text-color="white" icon="fa-solid fa-bottle-droplet" size="md"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{
                              index + 1 + ". 加" + step.name + step.weight + "克"
                            }}
                          </q-item-label>
                        </q-item-section>
                      </template>
                      <template v-if="step.type === 'heat'">
                        <q-item-section avatar>
                          <q-avatar rounded color="red-7" text-color="white" icon="local_fire_department" size="md"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ index + 1 + ". " + step.name }}
                            <template v-if="step.judgeType===1||step.judgeType===2">
                              <span class="" style="font-size: 13px">，持续至{{ step.targetTemperature }}℃</span>
                            </template>
                            <template v-if="step.judgeType===3">
                              <span class="" style="font-size: 13px">，持续{{ step.duration }}秒</span>
                            </template>
                            <template v-if="step.judgeType===4">
                              <span class="" style="font-size: 13px">，无控制</span>
                            </template>
                          </q-item-label>
                        </q-item-section>
                      </template>
                      <template v-if="step.type==='stir_fry'">
                        <q-item-section avatar>
                          <q-avatar rounded color="brown" text-color="white" icon="mdi-pot-mix" size="md"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ index + 1 + ". " + step.name }}
                            <span class="" style="font-size: 13px">，持续{{ step.duration }}秒</span>
                          </q-item-label>
                        </q-item-section>
                      </template>
                      <template v-if="step.type==='seasoning'">
                        <q-item-section avatar>
                          <q-avatar rounded color="teal" text-color="white" icon="mdi-shaker" size="md"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ index + 1 + ". 加" + step.name }}
                          </q-item-label>
                        </q-item-section>
                      </template>
                      <q-item-section avatar>
                        <q-icon color="primary" name="drag_indicator" class="drag-item"/>
                      </q-item-section>
                    </q-item>
                  </q-slide-item>
                </q-list>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card bordered flat class="my-card" style="">
            <q-card-section class="text-center">
              <div class="text-subtitle1">添加操作</div>
            </q-card-section>
            <q-separator inset/>
            <q-card-section>
              <div class="column justify-between" style="height: 350px">
                <div class="col">
                  <div class="row justify-around" style="padding-top: 30px">
                    <q-btn color="primary" label="食材" size="lg" @click="theIngredientDialog.show()"
                           style="width: 100px"/>
                    <q-btn color="primary" label="调料" size="lg" @click="theSeasoningDialog.show()"
                           style="width: 100px"/>
                  </div>
                </div>
                <div class="col">
                  <div class="row justify-around" style="padding-top: 30px">
                    <q-btn color="primary" label="火力" size="lg" @click="theFireDialog.show()" style="width: 100px"/>
                    <q-btn color="primary" label="翻炒" size="lg" @click="theStirFryDialog.show()"
                           style="width: 100px"/>
                  </div>
                </div>
                <div class="col">
                  <div class="row justify-around" style="padding-top: 30px">
                    <q-btn color="primary" label="水" size="lg" @click="theWaterDialog.show()" style="width: 100px"/>
                    <q-btn color="primary" label="油" size="lg" @click="theOilDialog.show()" style="width: 100px"/>
                  </div>
                </div>
              </div>

            </q-card-section>
            <q-separator inset/>
            <q-card-actions class="justify-around" style="padding-top: 15px">
              <q-btn color="primary" label="保存" @click="save"/>
              <q-btn color="primary" label="取消"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <TheIngredientDialog ref="theIngredientDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheSeasoningDialog ref="theSeasoningDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheFireDialog ref="theFireDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheStirFryDialog ref="theStirFryDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheWaterDialog ref="theWaterDialog" @submit="onSubmit" @update="onUpdate"/>
    <TheOilDialog ref="theOilDialog" @submit="onSubmit" @update="onUpdate"/>
  </q-page>
</template>

<script setup>
import TheStepList from "pages/dishEdit2/components/TheStepList.vue";
import { UseAppStore } from "stores/appStore";
import { onMounted, onUnmounted, ref, toRef } from "vue";
import TheIngredientDialog from "pages/dishEdit2/components/dialogs/TheIngredientDialog.vue";
import TheSeasoningDialog from "pages/dishEdit2/components/dialogs/TheSeasoningDialog.vue";
import TheFireDialog from "pages/dishEdit2/components/dialogs/TheFireDialog.vue";
import TheStirFryDialog from "pages/dishEdit2/components/dialogs/TheStirFryDialog.vue";
import TheWaterDialog from "pages/dishEdit2/components/dialogs/TheWaterDialog.vue";
import TheOilDialog from "pages/dishEdit2/components/dialogs/TheOilDialog.vue";
import { createDish } from "src/api/dish";
import Sortable from "sortablejs";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("菜品制作");

const steps = ref([]);

const theIngredientDialog = ref(null);
const theSeasoningDialog = ref(null);
const theFireDialog = ref(null);
const theStirFryDialog = ref(null);
const theWaterDialog = ref(null);
const theOilDialog = ref(null);

// const add = function (instructionType) {
//   switch (instructionType) {
//     case "INGREDIENT":
//       theIngredientDialog.value.show()
//       // steps.value.push({key:new Date().getTime(), name: instructionType[0]})
//   }
// }
const stepList = ref(null);
onMounted(() => {
  console.log(stepList.value.$el);
  const sortable = new Sortable(stepList.value.$el, {
    onEnd: onSortEnd,
    dragClass: "sortable-drag",
    chosenClass: "sortable-chosen",
    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
    easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
    handle: ".drag-item",  // Specifies which items inside the element should be draggable
  });
  onUnmounted(() => {
    sortable.destroy();
  });
});

const onSortEnd = (event) => {
  const draggedItem = steps.value[event.oldIndex];
  steps.value.splice(event.oldIndex, 1);
  steps.value.splice(event.newIndex, 0, draggedItem);
};

const dragStart = (index) => [
  console.log(index)
];

const onDelete = (index) => {
  console.log(index);
  steps.value.splice(index, 1);
};

const onSubmit = (val) => {
  steps.value.push(val);
};
const onUpdate = () => {
};

const save = async () => {
  const newDish = {
    name: "test",
    steps: steps.value
  };
  console.log(steps.value);
  const res = await createDish(newDish);
  console.log(res);
};
</script>

<style lang="scss" scoped>
.my-card {
  height: calc(100vh - 50px - 32px);
}

.sortable-drag{
  background: #1976d2;
}

.sortable-chosen{
  background: #26a69a;
}
</style>
