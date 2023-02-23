<template>
  <div>
    <q-dialog v-model="shown" persistent position="top">
      <q-card style="width: 400px" class="q-px-sm q-mt-lg">
        <q-card-section>
          <div class="text-h6">添加食材</div>
        </q-card-section>
        <q-item dense>
          <q-item-section avatar> 种类</q-item-section>
          <q-item-section>
            <q-input
              v-model="type"
              filled
              dense
              @blur="onInputBlur(e, 'type')"
              @focus="onInputFocus(e, 'type')"
              @input="onInputChange(e, 'type')"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" />
              </template>
            </q-input>
            <!--            <q-select-->
            <!--              filled-->
            <!--              v-model="type"-->
            <!--              use-input-->
            <!--              hide-selected-->
            <!--              fill-input-->
            <!--              input-debounce="0"-->
            <!--              dense-->
            <!--              :options="types"-->
            <!--              @filter="typeFilterFn"-->
            <!--              @input-value="setTypeModel"-->
            <!--              autofocus-->
            <!--              @blur="onInputBlur(e, 'type')"-->
            <!--              @focus="onInputFocus(e, 'type')"-->
            <!--              @input="onInputChange(e, 'type')"-->
            <!--            >-->
            <!--              <template v-slot:no-option>-->
            <!--                <q-item>-->
            <!--                  <q-item-section class="text-grey">-->
            <!--                    No results-->
            <!--                  </q-item-section>-->
            <!--                </q-item>-->
            <!--              </template>-->
            <!--            </q-select>-->
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section avatar> 形状</q-item-section>
          <q-item-section>
            <q-input
              v-model="shape"
              filled
              dense
              @blur="onInputBlur(e, 'shape')"
              @focus="onInputFocus(e, 'shape')"
              @input="onInputChange(e, 'shape')"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="toc" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section avatar> 分量</q-item-section>
          <q-item-section>
            <q-input
              v-model="weight"
              filled
              dense
              @blur="onInputBlur(e, 'weight')"
              @focus="onInputFocus(e, 'weight')"
              @input="onInputChange(e, 'weight')"
            >
              <template v-slot:append>
                <span class="text-body2">克</span>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section avatar> 菜盒</q-item-section>
          <q-item-section>
            <div class="q-pa-md">
              <div class="q-gutter-md">
                <q-radio
                  v-model="slotNo"
                  dense
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="1"
                  label="1"
                />
                <q-radio
                  v-model="slotNo"
                  dense
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="2"
                  label="2"
                />
                <q-radio
                  v-model="slotNo"
                  dense
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="3"
                  label="3"
                />
                <q-radio
                  v-model="slotNo"
                  dense
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="4"
                  label="4"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>

        <q-item dense>
          <q-item-section avatar> 时刻</q-item-section>
          <q-item-section>
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  v-model="min"
                  filled
                  dense
                  @blur="onInputBlur(e, 'min')"
                  @focus="onInputFocus(e, 'min')"
                  @input="onInputChange(e, 'min')"
                >
                  <template v-slot:append>
                    <span class="text-body2">分</span>
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-input
                  v-model="sec"
                  filled
                  dense
                  @blur="onInputBlur(e, 'sec')"
                  @focus="onInputFocus(e, 'sec')"
                  @input="onInputChange(e, 'sec')"
                >
                  <template v-slot:append>
                    <span class="text-body2">秒</span>
                  </template>
                </q-input>
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn v-close-popup flat color="primary">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="shown"
      persistent
      position="bottom"
      no-focus
      no-refocus
      seamless
      full-width
    >
      <CustomKeyboard ref="customKeyboard" @change="onChange" />
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CustomKeyboard from "pages/dishEdit/components/CustomKeyboard";

const shown = ref(false);
// const props = defineProps(["shown"])

const tempTypes = ["牛肉", "猪肉", "羊肉", "鸡肉", "鱼肉", "排骨"];
const types = ref(tempTypes);

const tempShapes = ["块状", "条状", "丝状", "片状"];
const shapes = ref(tempShapes);

const type = ref("");
const shape = ref("");
const weight = ref("");
const slotNo = ref("");
const min = ref("");
const sec = ref("");
const time = computed(() => parseInt(min.value) * 60 + parseInt(sec.value));

const nameToPara = {
  type,
  shape,
  weight,
  min,
  sec,
};

const customKeyboard = ref(null);
const onInputFocus = (e, name) => {
  customKeyboard.value.setInputName(name);
};

const onInputBlur = (e, name) => {};
const onInputChange = (e, name) => {
  customKeyboard.value.setInput(e.target.value, name);
};

function onChange(input, name) {
  console.log(input);
  nameToPara[name].value = input;
}

const typeFilterFn = (val, update, abort) => {
  update(() => {
    const needle = val;
    types.value = tempTypes.filter((v) => v.indexOf(needle) > -1);
  });
};

const setTypeModel = (val) => {
  type.value = val;
};

const shapeFilterFn = (val, update, abort) => {
  update(() => {
    const needle = val;
    shapes.value = tempShapes.filter((v) => v.indexOf(needle) > -1);
  });
};

const setShapeModel = (val) => {
  shape.value = val;
};

defineExpose({
  shown,
});
</script>

<style lang="scss" scoped></style>
