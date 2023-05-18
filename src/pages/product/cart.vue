<template>
  <div>
    <h2>Cart</h2>
    <cart-list></cart-list>
  </div>
</template>

<script>
import CartList from '~/src/components/CartList.vue'
// import { FETCH_CART_ITEMS } from '@/src/store'
// import { fetchCartItems } from '@/api/index'

export default {
  components: { CartList },
  //   async asyncData({ store }) {
  //     // async await을 안하면 데이터가 로드되기전에 페이지가 나오므로 빈 데이터가 올수 있다.
  //     // store에 있는 값 호출하기
  //     // const { data } = await store.dispatch(FETCH_CART_ITEMS) // FETCH_CART_ITEMS = 'FETCH_CART_ITEMS' 과 같다. data로 들어오는것을 볼수 있으므로 이렇게 변경가능
  //     // return {carts: data}
  //     // 위와 같이 쓸수도 있지만 문법만 state에 셋업해야하므로 아래와 같이 바꾼다. store에서 확인 할 수 있음
  //     await store.dispatch(FETCH_CART_ITEMS) // 1. 디스패치로 액션을 호출하고 - nuxtServerInit을 사용하게 되면 이부분을 store nuxtServerInit에 넣어준다.
  //   }, // 로컬 스트로지에 하지 않고 data로 저장하는 이유는 pc에서 장바구니에 담고 모바일로 확인 할 경우 그 장바구니가 빌수 있는 단점을 보완하것
  //   methods: {
  //     deleteItem(Itemid) {
  //       // vuex로 넘겨주기
  //       this.$store.commit('deleteCartItem', Itemid) // 클릭시 삭제는 되는대 새로고침시 안돼는것은 db에서 삭제하는 api가 없어서 저장을 못한다...
  //     },
  //   },
}
</script>