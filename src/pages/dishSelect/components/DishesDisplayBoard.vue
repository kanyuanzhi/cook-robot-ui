<template>
  <q-infinite-scroll
    ref="scroll"
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 390px; width: 100%"
    @load="onLoad"
    :offset="50"
  >
    <div class="row q-mb-md" v-for="r in rows" :key="'r' + r">
      <div class="col q-mr-md" v-for="col in 4" :key="col">
        <q-card
          v-if="
            last_row_cols === 0 ||
            (last_row_cols !== 0 && r !== rows) ||
            (r === rows && col <= last_row_cols)
          "
          class="img-item"
          @click="onImgClick(dishes[(r - 1) * 4 + col - 1].id)"
        >
          <q-img
            :src="dishes[(r - 1) * 4 + col - 1].image"
            :ratio="8 / 5"
            loading="lazy"
            spinner-color="white"
          >
            <div class="text-subtitle2 absolute-bottom">
              {{ dishes[(r - 1) * 4 + col - 1].name }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md-none">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
    <q-dialog v-model="dishesDetailsCardShown">
      <DishesDetailsCard :id="selectedDishId" />
    </q-dialog>
  </q-infinite-scroll>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import DishesDetailsCard from "pages/dishSelect/components/DishesDetailsCard";
import { getDishes, getStarredDishes } from "src/api/dish";

const props = defineProps(["is_starred", "initials"]);

const scroll = ref(null);

// const imgUrl = require("/src/assets/chicken-salad.jpg")
const dishes = ref([]);
const rows = ref(0);
const last_row_cols = ref(0);
const page_index = ref(1);

watch(
  () => props.initials,
  (initials) => {
    scroll.value.reset();
    dishes.value = [];
    rows.value = 0;
    last_row_cols.value = 0;
    page_index.value = 1;
    listDishes(page_index.value, 16, props.initials).then((res) => {
      scroll.value.resume();
      // console.log(res.data.length)
      // if (res.data.length === 0) {
      //   scroll.value.stop()
      //   return
      // } else scroll.value.resume()
      // dishes.value.push(...res.data)
      // const total = dishes.value.length
      // rows.value = Math.ceil(total / 4)
      // last_row_cols.value = total % 4
      // page_index.value += 1
    });
  }
);

const listDishes = (index, size, initials = "") => {
  if (props.is_starred) return getStarredDishes(index, size, initials);
  else return getDishes(index, size, initials);
};

function onLoad(index, done) {
  listDishes(page_index.value, 16, props.initials).then((res) => {
    console.log(res.data.length);
    if (res.data.length === 0) {
      scroll.value.stop();
      return;
    } else scroll.value.resume();
    dishes.value.push(...res.data);
    const total = dishes.value.length;
    rows.value = Math.ceil(total / 4);
    last_row_cols.value = total % 4;
    page_index.value += 1;
    done();
  });
}

const thumbStyle = reactive({
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
});

const barStyle = reactive({
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
});

const dishesDetailsCardShown = ref(false);

const selectedDishId = ref("");

function onImgClick(id) {
  if (!dishesDetailsCardShown.value) dishesDetailsCardShown.value = true;
  selectedDishId.value = id;
}
</script>

<style lang="scss" scoped>
.img-item:hover {
  cursor: pointer;
}
</style>
