import { fetchCartItems } from '~/api'

// constants - 상수로 관리하기

export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'

// store
export const state = () => ({
  // 데이터 속성
  cartItems: [],
})

export const mutations = {
  // state값을 변경하는 속성(commit으로 호출할 수 있음)
  // 장바구니 담기 기능 구현
  addCartItem(state, cartItem) {
    // cartItem 대신 payload를 썻을 경우 ♦️
    // 첫번째 인자 state, 두번째 payload : payload가 여러개일때는 {}로 묶어서 객체로 넘겨준다.(액션의 payload도 마찬가지)
    const newCartItem = {
      ...cartItem, // 아이템 하나하나를 모두 모아 놓은것
      imageUrl: `${cartItem.imageUrl}?random=${Math.random()}`, // api 제약상 넣은 코드임
    }
    state.cartItems.push(newCartItem) // cartItem 대신 payload.cartItem으로 쓸 수 있다.
  },
  setCartItems(state, cartItems) {
    // cart로 담은 부분을 바꿔주는것 3. 카트 새로고침시 날아가기 때문에 state에 값을 담아서 다시 뿌려주는것!
    state.cartItems = cartItems // cartItem이 아니라 cartItems로 쓴이유는 여러개를 넣어야 하므로
  },
  deleteCartItem(state, id) {
    state.cartItems = state.cartItems.filter((el) => el.id !== id)
  },
}

export const actions = {
  // mutations에서 장바구니에 담을 값을 actions로 뿌려주기
  // context
  async [FETCH_CART_ITEMS]({ commit }) {
    // es6문법으로 변화하는 값은 [] 안에 변수로 넣어준다. 문자열을 동적으로 연결해 준다. commit = store의 context - Destructuring assignment
    // https://javascript.info/destructuring-assignment
    // commit으로 mutations 호출, 컴포넌트에서는 dispatch로 호출
    const { data } = await fetchCartItems() // response를 보면 data가 나오므로 const response를 {data}로 고친다.
    // console.log(response)
    commit(
      'setCartItems',
      data.map((item) => ({
        // 이미지를 랜덤으로 나오기 위해, api 제약으로 넣은것
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
    ) //  2. state에 셋업 하기 위해서 mutations에 setCartItems을 호출함
  },
  //  fetch를 사용할때에는 nuxtServerInit없이 사용가능
//   async nuxtServerInit(storeContext, nuxtContext) { // { commit }, { req, res }
//     // const { data } = await fetchCartItems()  
//     // storeContext.commit(
//     //   'setCartItems',
//     //   data.map((item) => ({
//     //     ...item,
//     //     imageUrl: `${item.imageUrl}?random=${Math.random()}`,
//     //   }))
//     // ) 
//       // 위와 같이 매번 코드를 모드 넣으면 너무 길어지고 알아보기도 어렵기 때문에 actions에 정의한 내용을 dispatch로 연결해 준다.
//     await storeContext.dispatch(FETCH_CART_ITEMS);
//   }, // nuxtServerInit는 정의만 하고 따로 호출하지 않는다. 어느 페이지에 진입하자마자 호출되기 때문!



}
