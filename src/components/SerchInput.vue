<template>
  <div class="searchWrap">
    <!-- <input
      type="text"
      :value="searchKeyword"
      @input="$emit('input', $event.target.value)"
    /> -->
    <!-- @input="$emit('input', $event.target.value)" 은 input값이 바뀔때마다 부모에게 input이라는 이벤트로
    보내기 때문에 v-model과 같은 방식 -->
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keypress.enter="$emit('search')"
    />
    <!-- v-model은 v-bind와 v-on을 조합해서 만들었으므로 v-model 속성에 연결한 값이 하위 컴포넌트에 value 라는 props 속성으로 내려간다.
        https://vuejs.org/api/#model
    -->
    <button type="button" @click="$emit('search')" >Search</button>
  </div>
</template>

<script>
export default {
  /*
        props:{
            propsName:{
                type:Number,
                default:,
            }
        }    
    */
  //   props: {
  //     searchKeyword: {
  //       // props 이름
  //       type: String, // props 타입
  //       default: () => '', // props 초기값
  //     },
  props: {
    value: { // v-model로 했을 경우 value로 맞춰주어야 한다.
      // props 이름
      type: String, // props 타입
      default: () => '', // props 초기값
    },
  },

  // 부모가 데이터 관리를 해야하므로 input의 변하는 값을 emit으로 올려 준다.
}
</script>

<style></style>
