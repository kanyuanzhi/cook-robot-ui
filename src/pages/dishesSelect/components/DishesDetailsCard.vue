<template>
  <q-card class="my-card">
    <q-img :src="dish.image" :ratio="8/5"/>

    <q-card-section>
      <!--      <q-btn-->
      <!--        fab-->
      <!--        round-->
      <!--        text-color="white"-->
      <!--        icon="send"-->
      <!--        class="absolute bg-green"-->
      <!--        style="top: 0; right: 20px; transform: translateY(-50%);"-->
      <!--      ></q-btn>-->
      <!--      <q-btn-->
      <!--        fab-->
      <!--        round-->
      <!--        :color="dish.is_starred?'red':'primary'"-->
      <!--        icon="favorite"-->
      <!--        class="absolute"-->
      <!--        style="top: 0; right: 100px; transform: translateY(-50%);"-->
      <!--        @click="onStarBtnClick"-->
      <!--      ></q-btn>-->
      <!--      <q-btn-->
      <!--        fab-->
      <!--        round-->
      <!--        color="primary"-->
      <!--        icon="edit"-->
      <!--        class="absolute"-->
      <!--        style="top: 0; right: 180px; transform: translateY(-50%);"-->
      <!--      ></q-btn>-->

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ dish.name }}
        </div>
        <div class="col-auto text-body2 row no-wrap items-center">
          <!--          <q-icon name="hourglass_top" color=""/>-->
          需要{{ parseInt(dish.cook_time / 60) }}分{{ dish.cook_time % 60 }}秒
        </div>
      </div>

      <!--      <q-rating v-model="stars" :max="5" size="32px" />-->
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        食材
      </div>
      <div class="text-body2 text-grey-10">
        青菜 牛肉
      </div>
      <div class="text-subtitle1">
        调料
      </div>
      <div class="text-body2 text-grey-10">
        食盐 糖 酱油
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions align="right">
      <q-btn flat round color="primary" icon="edit"/>
      <q-btn flat round :color="dish.is_starred?'red':'grey' " icon="favorite" @click="onStarBtnClick"/>
      <q-btn flat round color="teal" icon="send"/>
      <!--      <q-btn v-close-popup flat color="primary" icon="event"/>-->
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {getDish, updateDish} from "src/api/dish";
import {ref} from "vue";

const imgUrl = require("src/assets/chicken-salad.jpg")
const props = defineProps(["id"])
const dish = ref({
  id: "",
  name: "",
  image: "",
  cook_time: "",
  is_starred: 0
})

getDish(props.id).then(res => {
  console.log(res.data)
  dish.value = res.data
})

function onStarBtnClick() {
  dish.value.is_starred = dish.value.is_starred ? 0 : 1
  updateDish(dish.value).then(res => {
    console.log(res.data)
    if (!res.data){
      dish.value.is_starred = dish.value.is_starred ? 0 : 1
    }
  })
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 40%;
}
</style>
