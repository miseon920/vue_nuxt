<template>
  <!-- <div>{{product}}</div> -->
  <div>
    <div v-if="searchItem !== '' && products.length == 0" class="nodata">
      {{ searchItem }}에 해당하는 상품이 없습니다.
    </div>
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
        @click="moveToProduct(product)"
      >
        <!--moveToProduct(product) / product를 자체를 넘길때, 특정값만 넘길경우 product.id 이런식으로 적음  -->
        <!-- {{product}} -->
        <img :src="product.imageUrl" :alt="product.name" />
        <div>
          <b>{{ product.name }}</b>
        </div>
        <div>$ {{ product.price }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
// export default {
//  async asyncData({ params, $http }) {
//     // asyncData는 data보다 위쪽에 있어야 한다.
//     const response = await axios.get('http://localhost:3000/products')
//     // console.log(response);
//     const products = response.data
//     return { products } // es6 객체 축약법 = products : products 와 같음
//   },
// } // 👀asyncData은 pages 아래에 있는 폴더에서만 사용할 수 있기 때문에 components에 붙일경우 에러가 난다.

export default {
  props: {
    products: {
      // v-model로 했을 경우 value로 맞춰주어야 한다.
      // props 이름
      type: Array, // props 타입
      default: () => [], // props 초기값
    },
    searchItem: {
      type: String,
      default: '',
    },
  },
  methods: {
    moveToProduct(product) {
      // api를 보면 http://localhost:3000/products/${id} 값에 따라서 상세페이지를 뿌려주게 되어있음
      // console.log(product);
      this.$router.push(`product/${product.id}`)
    },
  },
}
</script>


<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  li {
    width: calc(50% - 10px);
    cursor: pointer;
    img {
      max-width: 100%;
    }
  }
}
</style>