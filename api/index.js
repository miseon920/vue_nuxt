import axios from 'axios'

// 공통 설정을 인스턴스화 하기

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

function fetchProductById(id) {
  // 상세페이지에 뿌려줄값
  return instance.get(`/products/${id}`)
}

function fetchProductByKeyword(keword) {
  // 검색부분
  // return instance.get(`/products/?name_like=${keword}`) // 이렇게 적을 수도 있지만 아래처럼 많이 적음
  return instance.get(`/products`, {
    // config 속성중 params 이용
    params: {
      name_like: keword, // 키값으로 name_like 넣어줌
    },
  })
}

export { fetchProductById, fetchProductByKeyword }
