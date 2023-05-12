<template>
  <div class="app">
    <TheHeader/>
        <Nuxt />
    <TheFooter/>
    <!--Nuxt는 <router-view></router-view>를 의미  -->
  </div>
</template>

<script>
import TheHeader from "~/src/components/TheHeader.vue";
import TheFooter from "~/src/components/TheFooter.vue";


export default {
    components:{
        TheHeader,
        TheFooter
    }
}
</script>

<style>

</style>

