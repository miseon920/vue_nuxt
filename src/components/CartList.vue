<template>
  <div>
    <ul class="cart_wrap">
      <li
        v-for="cartItem in $store.state.cartItems"
        :key="cartItem.id"
        class="cart_box"
      >
        <!-- {{ cartItem }} -->
        <div class="cart_left">
          <div>
            <img :src="cartItem.imageUrl" :alt="cartItem.name" />
          </div>
        </div>
        <div class="cart_right">
          <h3>
            {{ cartItem.name }}
          </h3>
          <div>$ {{ cartItem.price }}</div>
          <button type="button" class="buy">구매하기</button>
          <!-- <button
              type="button"
              class="delete"
              @click="deleteItem(cartItem.id)"
            >
              삭제
            </button> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { FETCH_CART_ITEMS } from '@/src/store'
export default {
  // 일반 컴포넌트에서 데이터를 가져와야 할 때에는 asyncData를 쓸 수 없으므로 fetch속성을 이용해서 데이터를 가져온다.
  async fetch() {
    await this.$store.dispatch(FETCH_CART_ITEMS)
  },
}
</script>

<style lang="scss" scoped>
.cart_wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  align-items: center;
  .cart_box {
    display: flex;
    gap: 15px;
    align-items: center;
    .cart_left div {
      width: 100px;
      height: 100px;
      img {
        max-width: 100%;
        height: 100%;
      }
    }
    .cart_right {
      text-align: left;
      button {
        margin-top: 10px;
        height: 30px;
        padding: 0 5px;
        background: #fff;
        color: #000;
        border: 1px solid #000;
        cursor: pointer;
        &:hover {
          background: #000;
          border-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
