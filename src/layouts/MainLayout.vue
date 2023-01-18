<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <div class="row">
        <q-toolbar class="col-4">
          <q-btn flat round dense icon="home" to="/"/>
          <q-toolbar-title>Cook Robot</q-toolbar-title>
          <q-space/>
        </q-toolbar>
        <q-toolbar class="col-4">
          <q-space/>
          <q-toolbar-title style="text-align: center">{{ subPage }}</q-toolbar-title>
          <q-space/>
        </q-toolbar>
        <q-toolbar class="col-4">
          <q-space/>
          <q-btn flat round dense icon="wifi" class="q-mr-sm"/>
          <q-btn flat round dense icon="more_vert"/>
        </q-toolbar>
      </div>
    </q-header>

    <!--    <q-drawer-->
    <!--      v-model="leftDrawerOpen"-->
    <!--      show-if-above-->
    <!--      bordered-->
    <!--    >-->
    <!--      <q-list>-->
    <!--        <q-item-label-->
    <!--          header-->
    <!--        >-->
    <!--          Essential Links-->
    <!--        </q-item-label>-->

    <!--        <EssentialLink-->
    <!--          v-for="link in essentialLinks"-->
    <!--          :key="link.title"-->
    <!--          v-bind="link"-->
    <!--        />-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref, watch} from 'vue'
import {UseAppStore} from "stores/appStore";

const useAppStore = UseAppStore()
const subPage = ref("")

watch(
  useAppStore.$state,
  (state)=>{
    subPage.value = state.subPageTitle
  },
  {
    deep: true
  }
)
</script>
