<template>
  <div>
    <!-- <serch-input :searchKeyword="searchKeyword" @input="updateSearchKeyword"></serch-input> -->
    <!-- @input="updateSearchKeyword"는  @input="searchKeyword=$event" 로 쓸 수도 있음-->
    <serch-input
      v-model.trim="searchKeyword"
      @search="searchProduct"
    ></serch-input>
    <!-- v-model은 form 태그 뿐만 아니라 컴포넌트에도 적용가능하다. 
        <input> <textarea> =  value, input
        checkbox, radio =  checked, change
        select = value, change
        components : https://vuejs.org/guide/components/v-model.html

        ♦️v-model은 초기값을 무시 하므로 자바스크립트에 초기값을 지정해 줘야 한다.
        함수의 첫 번째 인자에는 해당 이벤트(event)가 들어온다.
    -->
    <!-- <div v-if="products.length == 0" class="nodata">
      {{ searchItem }}에 해당하는 상품이 없습니다.
    </div>
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
        @click="moveToProduct(product)"
      >

        <img :src="product.imageUrl" :alt="product.name" />
        <div>
          <b>{{ product.name }}</b>
        </div>
        <div>$ {{ product.price }}</div>
      </li>
    </ul> -->
    <product-list :products="products" :search-item="searchItem"></product-list>
    <!-- asyncData는 pages폴더 아래에 쓸수 있으므로 이렇게 쓰고 내려준다. -->
    <div class="cart_wrap" @click="moveToCart">
      <button class="btn">장바구니</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SerchInput from '~/src/components/SerchInput.vue'
import { fetchProductByKeyword } from '@/api/index'
// 물결(~)표시는 웹팩 resolve 옵션 속성 - nuxt에서는 ~ 이나 @로 사용할 수 있게 설정되어 있음
// https://webpack.kr/configuration/resolve/
import ProductList from '~/src/components/ProductList.vue'

export default {
  components: { SerchInput, ProductList },
  // name: 'IndexPage', 주석걸때 띄워쓰기해야 주석이된다..?
  // https://nuxtjs.org/
  // components: { ProductList },
  // nuxt에서 asyncData로 호출하기 - 깜빡임이 사라짐
  async asyncData({ params, $http }) {
    // asyncData는 data보다 위쪽에 있어야 한다.
    const response = await axios.get('http://localhost:3000/products')
    // console.log(response.data);
    // const products = response.data;

    // 상품 목록 표시하기 - 이미지가 모두 같아서 변경해본것!

    const products = response.data.map((item) => {
      return {
        ...item, // 아이템 하나하나를 모두 모아 놓은것
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }
    }) // return을 안쓸경우에는 함수 부분을 ()로 한번더 감싸면된다.
    return { products } // es6 객체 축약법 = products : products 와 같음
  },

  // asyncData는 vue에서 뷰라우터의 네비게이션 가드에서 데이터 호풀을 받고 페이지에 진입하는 것과 같다.
  // 페이지에 진입전에 데이터를 다 받아와야 하므로 pages 폴더 아래에서만 사용 가능한 것이며 this를 사용할 수 없는 것이다.

  // 뷰라이플 싸이클을 이용하는 방식
  //   data() {
  //     return {
  //       products: [],
  //     }
  //   },
  // 빈배열에 data를 받아와서 넣기 때문에 깜빡임이 보이는것
  // async created(){
  //     const response = await axios.get('http://localhost:3000/products');
  //     // console.log(response);
  //     this.products = response.data;
  // },

  // 넉스트에서는 asyncData, fetch를 이용한다.
  data() {
    return {
      searchKeyword: '',
      searchItem: '',
    }
  },
  methods: {
    // updateSearchKeyword(keyword){ // $event.target.value를 받기 위해 파라미터 keyword에 넣어준다.
    //     this.searchKeyword = keyword;
    // }
    async searchProduct() {
      this.searchItem = this.searchKeyword
      // this.searchKeyword - 입력한값
      // api를 보면 검색 부분에 GET ?name_like=server 로 받아온다
      // 검색시 api 호출할 부분 등록하기

      if (!this.searchKeyword) {
        alert('검색어를 입력하세요.')
        return
      }

      const response = await fetchProductByKeyword(this.searchKeyword)
      // console.log(response); // params에  name_like에 찍히는 것을 볼 수 있음
      // this.products = response.data; // 이렇게 쓰면 되나 현재 api 이미지 제약으로 인하여 map으로 랜덤으로 뿌린것
      this.products = response.data.map((item) => {
        // products는 현재 api에서 리스트로 뿌려준 인스턴스이다.
        return {
          ...item,
          imageUrl: `${item.imageUrl}?random=${Math.random()}`,
        }
      })
    },
    moveToCart() {
      this.$router.push(`/product/cart`)
    },
  },
}
</script>

<style lang="scss" scoped>
.cart_wrap {
  position: fixed;
  bottom: 50px;
  right: 50px;
  .btn {
    display: inline-block;
    height: 40px;
    padding:0 10px;
    background:#000;
    border:0;
    color:#fff;
    box-shadow: none;
    cursor:pointer;
  }
}
</style>
