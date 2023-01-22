<template>
  <q-page>
    <div class="q-pa-md">
      <div class="column q-gutter-y-sm">
        <div class="col">
          <q-input
            ref="input"
            v-model="searchedDishesName"
            debounce="500"
            filled
            placeholder="输入菜品名称首字母搜索"
            dense
            @focus.prevent="onFocus"
            @blur.prevent="onBlur"
          >
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-dialog v-model="keyboardShown" no-focus no-refocus seamless full-width position="bottom">
            <CustomKeyboard ref="customKeyboard" :input-prefix="searchedDishesName" @change="onChange" @clear="onClear"
                            @search="onSearch"/>
          </q-dialog>
        </div>
        <div class="col">
          <q-tabs
            v-model="tab"
            class="bg-blue-2 text-primary"
            active-color="white"
            active-bg-color="primary"
            indicator-color="transparent"
            align="justify"
            inline-label
          >
            <q-tab :ripple="false" name="default" icon="fastfood" :label="'预置菜品('+defaultCounts +')'">
              <!--              <q-badge color="red" floating>2</q-badge>-->
            </q-tab>
            <q-tab :ripple="false" name="stars" icon="favorite" :label="'收藏菜品('+starsCounts +')'">
              <!--              <q-badge color="red" floating>10+</q-badge>-->
            </q-tab>
          </q-tabs>
          <q-tab-panels v-model="tab">
            <q-tab-panel name="default" class="q-px-none">
              <FishesDisplayBoard/>
            </q-tab-panel>
            <q-tab-panel name="stars" class="q-px-none">
              <FishesDisplayBoard/>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import {UseAppStore} from "stores/appStore";
import {ref} from "vue";
import FishesDisplayBoard from "pages/fishesSelect/components/FishesDisplayBoard";
import CustomKeyboard from "pages/fishesSelect/components/CustomKeyboard"
import 'simple-keyboard/build/css/index.css';
import {useQuasar} from 'quasar'

const $q = useQuasar()

const useAppStore = UseAppStore()
useAppStore.setSubPageTitle("菜品选择")

const searchedDishesName = ref("")

const tab = ref("default")

const keyboardShown = ref(false)
const customKeyboard = ref(null)
const input = ref(null)
const defaultCounts = ref(10)
const starsCounts = ref(10)

function onFocus() {
  if (!keyboardShown.value) {
    keyboardShown.value = true
  }
}

function onBlur() {
  if (keyboardShown.value) {
    keyboardShown.value = false
    search()
  }
}

function onClear() {
  searchedDishesName.value = ""
}

function onChange(input) {
  searchedDishesName.value = input
}

function onSearch() {
  keyboardShown.value = false
  input.value.blur()
  search()
}

function search() {
  $q.notify({
    message: "搜索",
    timeout: 1000,
    position: "top"
  })
}

</script>

<style lang="scss" scoped>

.img-item {
  width: 100%;
  //width: 230px;
  //height: 155px;
}

:deep(.q-img__content > div) {
  padding: 6px;
}

//
//.my-card {
//  width: 100%;
//  max-width: 200px;
//}

</style>
