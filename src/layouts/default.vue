<template>
  <div class="app">
    <TheHeader />
    <Nuxt />
    <TheFooter />
    <!--Nuxt는 <router-view></router-view>를 의미  -->
  </div>
</template>

<script>
// import Cookie from 'js-cookie'
import TheHeader from '~/src/components/TheHeader.vue'
import TheFooter from '~/src/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
  },

//   mounted() {
//     // 클라이언트측에서 쿠키 읽기
//     const value = Cookie.get('key')

//     // 클라이언트측에서 쿠키 저장하기
//     Cookie.set('key', value)
//     Cookie.remove('name', {path: ''})
//   },
}
</script>

<style></style>
