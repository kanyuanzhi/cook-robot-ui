<template>
  <div class="row q-gutter-sm justify-evenly" style="width:100%; height: 100%">
    <div
      v-for="(step, index) in props.steps" :key="step.key"
      class="column step-item bg-primary text-center"
    >
      <div class="column" style="border-bottom: 1px white solid;">
        <div class="q-my-xs q-mx-md">
          <span class="" style="font-size: 13px">步骤{{ index + 1 }}</span>
        </div>
      </div>
      <template v-if="step.type !== 'seasoning'">
        <div class="column q-my-xs q-mx-md">
          <div class="col">
            <span class="" style="font-size: 17px">{{ step.name }}</span>
          </div>
          <div class="col">
            <template v-if="step.type==='ingredient'||step.type==='water'||step.type==='oil'">
              <span class="" style="font-size: 13px">{{ step.weight }}克</span>
            </template>
            <template v-if="step.type === 'heat'">
              <template v-if="step.judgeType===1||step.judgeType===2">
              <span class="" style="font-size: 13px">持续至{{ step.targetTemperature }}℃</span>
              </template>
              <template v-if="step.judgeType===3">
                <span class="" style="font-size: 13px">持续{{ step.duration }}s</span>
              </template>
              <template v-if="step.judgeType===4">
                <span class="" style="font-size: 13px">无控制</span>
              </template>
            </template>
            <template v-if="step.type==='stir_fry'">
              <span class="" style="font-size: 13px">持续{{ step.duration }}s</span>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row q-my-xs q-mx-md">
          <div v-for="seasoning in step.seasonings" :key="seasoning.key" class="column">
            <div class="col-auto">
              <span class="" style="font-size: 17px">{{ seasoning.label }}</span>
            </div>
            <div class="col-auto">
              <span class="" style="font-size: 13px">{{ seasoning.weight }}克</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(["steps"]);

const autoColor = (type) => {
  switch (type) {
    case "ingredient":
      return "green";
    case "water":
      return "primary";
    case "seasoning":
      return "teal-7";
    case "fire":
      return "red-14";
    case "stir_fry":
      return "amber-10";
    default:
      return "deep-purple-9";
  }
};
</script>

<style lang="scss" scoped>
.step-item {
  border: 1px grey solid;
  border-radius: 10px;
}
</style>
