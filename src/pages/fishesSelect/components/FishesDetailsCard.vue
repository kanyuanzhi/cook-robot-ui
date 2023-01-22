<template>
  <q-card class="my-card">
    <q-img :src="imgUrl" :ratio="8/5"/>

    <q-card-section>
      <q-btn
        fab
        round
        text-color="white"
        icon="send"
        class="absolute bg-green"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      ></q-btn>
      <q-btn
        fab
        round
        color="primary"
        icon="favorite"
        class="absolute"
        style="top: 0; right: 100px; transform: translateY(-50%);"
      ></q-btn>
      <q-btn
        fab
        round
        color="primary"
        icon="edit"
        class="absolute"
        style="top: 0; right: 188px; transform: translateY(-50%);"
      ></q-btn>

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          name
        </div>
        <div class="col-auto text-caption q-pt-md row no-wrap items-center">
          <q-icon name="hourglass_top" color=""/>
          需要25分钟
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

    <q-separator />

<!--    <q-card-actions align="right">-->
<!--      <q-btn v-close-popup flat color="primary" label="Reserve" />-->
<!--      <q-btn v-close-popup flat color="primary" round icon="event" />-->
<!--    </q-card-actions>-->
  </q-card>
</template>

<script setup>
const imgUrl = require("src/assets/chicken-salad.jpg")
</script>

<style lang="scss" scoped>
.my-card{
  width: 40%;
}
</style>
