<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 390px; width: 100%;"
  >
    <div class="row q-mb-md" v-for="(r) in 2" :key="'r' + r">
      <div class="col q-mr-md" v-for="col in 4" :key="col">
        <q-card class="img-item" @click="onImgClick">
          <q-img
            :src="imgUrl"
            :ratio="8/5"
            loading="lazy"
            spinner-color="white"
            placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
          >
            <div class="text-subtitle2 absolute-bottom">name</div>
          </q-img>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="fishesDetailsCardShown">
      <FishesDetailsCard/>
    </q-dialog>
  </q-scroll-area>
</template>

<script setup>
import {reactive, ref} from "vue";
import FishesDetailsCard from "pages/fishesSelect/components/FishesDetailsCard";

const imgUrl = require("/src/assets/chicken-salad.jpg")

const thumbStyle = reactive({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.75
})

const barStyle = reactive({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2
})

const fishesDetailsCardShown = ref(false)

function onImgClick() {
  if (!fishesDetailsCardShown.value) fishesDetailsCardShown.value = true
}
</script>

<style lang="scss" scoped>
.img-item:hover {
  cursor: pointer;
}
</style>
