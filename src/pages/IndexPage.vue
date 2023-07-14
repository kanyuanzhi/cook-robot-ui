<template>
  <q-page class="flex flex-center">
    <div class="btn-menu">
      <div class="column">
        <div class="row" style="height: 200px">
          <NavigateButton
            col-size="col-6"
            font-size-class="text-h4"
            color="primary"
            to="/running"
          >运行控制
          </NavigateButton>
          <NavigateButton
            col-size="col-6"
            font-size-class="text-h4"
            color="primary"
            to="/dishSelect"
          >菜品选择
          </NavigateButton>
        </div>
        <div class="row" style="height: 200px">
          <NavigateButton
            col-size="col-2"
            font-size-class="text-h4"
            color="primary"
            to="/dishEdit"
          >菜品制作
          </NavigateButton>
          <NavigateButton
            col-size="col-2"
            font-size-class="text-h4"
            color="primary"
            to="/dishEdit2"
          >菜品制作2
          </NavigateButton>
          <NavigateButton
            col-size="col-4"
            font-size-class="text-h4"
            color="primary"
            to="/overallControl"
          >全量控制
          </NavigateButton>
          <NavigateButton
            col-size="col-4"
            font-size-class="text-h4"
            color="primary"
            to="/systemSettings"
          >系统设置
          </NavigateButton>
        </div>
      </div>
    </div>
    <!--    <img-->
    <!--      alt="Quasar logo"-->
    <!--      src="~assets/quasar-logo-vertical.svg"-->
    <!--      style="width: 200px; height: 200px"-->
    <!--    >-->
  </q-page>
</template>

<script setup>
import NavigateButton from "src/components/NavigateButton";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore();
useAppStore.setSubPageTitle("");

// window.ipcRenderer.server((e, m) => {
//   console.log(m)
// })
</script>

<style lang="scss" scoped>
.btn-menu {
  height: 400px;
  width: 80%;
  //background-color: #21BA45;
  //border: solid 1px red;
}
</style>
