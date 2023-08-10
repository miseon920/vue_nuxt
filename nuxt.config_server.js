export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue_nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // 디렉토리 변경시 추가해주어야함
  dir: {
    layouts: 'src/layouts',
    pages: 'src/pages',
    store: 'src/store',
    // middleware: 'src/middleware',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // npm install --save-dev sass sass-loader@10 설치 후 경로 지정
  css: ["~/assets/css/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  
  // server setup
    // server: {
    //     port: 5000 // default: 3000
    // }
  server: {
    port:process.env.NODE_ENV === 'production' ? null : 5000,
  },

  // env congig
  env: {
    baseURL:process.env.NODE_ENV === 'production' ?
     'https://my-json-server.typicode.com/miseon920/json-api': 'http://localhost:3000',
  }, // api > index.js 의  baseURL을 확인 한 후 세팅한다.
//   generate: {
//     exclude: ['/product'],
//  },
}

/**
 * export default {
  target: 'server'  //static의 경우 이부분이 static으로 설정
}
 target 속성의 기본 값은 server이므로 보이지 않아도 괜찮음
 * 
 */