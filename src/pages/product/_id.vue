<template>
  <div>
    <div class="sub_tit">상세페이지</div>
    <!-- <div>{{ product }}</div> -->
    <ul>
      <li><img :src="product.imageUrl" :alt="product.name" /></li>
      <li>name : {{ product.name }}</li>
      <li>price : $ {{ product.price }}</li>
      <li>
        <button type="button" @click="addToCart()">
          장바구니 담기
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import { fetchProductById, createCartItem, fetchCartItems } from '@/api/index'

export default {
  async asyncData({ params, $http, error }) {
    /* context 속성은 넉스트프레임워크에 사용되는 속성으로 플러그인, 미들웨어 속성에도 접근 가능하다.
    스토어, 라우터 정보뿐만 아니라 서버 사이드 요청, 응답 속성에도 접근 할 수 있다.
     페이지 진입전 해당 페이지에 정보를 가져와야 할때 context 속성 중 params를 이용하여 접근한다. */
    /*
        asyncData의 파라미터(context 속성)
        function (context) { // asyncData, plugins, middleware, ...
        // Always available
        const {
            app,
            store,
            route,
            params,
            query,
            env,
            isDev,
            isHMR,
            redirect,
            error,
        $config
        } = context

        // Only available on the Server-side
        if (process.server) {
            const { req, res, beforeNuxtRender } = context
        }

        // Only available on the Client-side
        if (process.client) {
            const { from, nuxtState } = context
        }
        }
    */

    // https://nuxtjs.org/docs/internals-glossary/context/

    // const id = console.log(params.id);
    try {
      // api호출시 에러가 났을 경우를 try catch문을 이용하여 에러 페이지로 이동 시킬 수 있다.
      const response = await fetchProductById(params.id)
      const product = response.data
      return { product }
    } catch (e) {
      error({ statusCode: 503, message: 'api 요청에 실패했습니다.' })
    }
  },
  //  created(){
  //     // console.log(this.$route); // route 정보가 담김
  //     // this.$route.params.id 와 product.id가 같은 것을 확인
  //     // 다이나믹 라우팅을 위해 _변수.vue 로 파일을 만든다.
  // }
  methods: {
    async addToCart() {
      const response = await fetchCartItems()
      const matchId = response.data.find((con) => con.id === this.product.id);
      if(matchId){
        alert('이미 담긴 상품입니다.');
        return;
      }
      await createCartItem(this.product)
      // vuex로 넘겨주기
      this.$store.commit('addCartItem', this.product)
      this.$router.push(`/product/cart/`)
    },
  },
}
</script>

<style></style>
