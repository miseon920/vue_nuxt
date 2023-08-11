# Nuxt 뷰 서버사이드 랜더링을 구현할 때 가장 많이 쓰는 프레임워크
- SEO 전달
- 서버 사이드 렌더링이란 웹 페이지의 내용을 서버에서 모두 작성해서 클라이언트(브라우저)로 보낸 뒤 화면에 그리는 방식을 의미
- 쓰는이유 : 검색 엔진 최적화,빠른 페이지 렌더링


# ssr이 무조건 좋은건가?
- 서버쪽에서 환경 구성이 되므로 서버빌드에 대한 이해도가 필요하다
- node.js 환경에서 실행 되므로 브라우저 관련 api 다룰 시 주의 해야한다. 
- beforeCreate나 created에서  window, document같은 브라우저 객체에 접근할 수 없다.


> 😉컴포넌트가 최초로 생성되는 시점이 브라우저 아니라 Node.js 환경이기 때문에 
beforeCreate나 created에서 브라우저 객체를 접근할 수 없습니다. 
대신 beforeMount나 mounted에서 window와 document를 접근할 수 있다 😃
네트워크탭->doc을 보면 csr인 경우 홈페이지가 로드 되었을 때 엘리먼트에 나오는 코드 들이 비어있지만 ssr은 서버에서 그리므로 코드가 다 나와있다.

--------------------------------------------------------------------------------------------------

1. csr - html 페이지가 하나로 인식되므로 url 바뀌어도 오픈태그가 변하지 않는다.
2. ssr - 페이지별로 오픈태그를 설정 할 수 있어 검색엔진 최적화(SEO)에 효과적이다.

<https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko>


# Nuxt

- 검색엔진 최적화
- 초기 프로젝트 설정 비용 감소와 생산성 향상(라우터,스토어등의 라이브러리 설치 및 설정 파일 필요없음)
- 파일 기반의 라우팅 방식, 설정파일 자동 생성
- 페이지 로딩 속도와 사용자 경험 향상
- 코드 스플리팅(코드 스플리팅을 하게 되면, 지금 당장 필요한 코드가 아니라면 따로 분리시켜서, 나중에 필요할때 불러와서 사용 할 수 있어 속도 개선이 된다.)

<-> 리액트 코드 스플리팅 : https://velog.io/@velopert/react-code-splitting

- 페이지 기반 라우터 자동 생성
- pages폴더 안에 페이지 생성

# 뷰 라우터와의 비교
위에서 살펴본 넉스트의 라우팅 방식을 뷰 라우터 방식과 비교하면 아래와 같습니다.

- Nuxt.js	VueRouter

```<Nuxt>	<router-view>```
```<NuxtLink to="/">	<router-link to="/">```
- 이처럼 넉스트는 라우터 설정 파일을 일일이 생성 및 설정하지 않아도 되어 편리합니다.


```<router-view>, <Nuxt>``` 모두 뷰 컴포넌트입니다. 따라서 ```<RouterView>```와 ```<router-view>```와 같습니다. ```<Nuxt>```도 그럼 동일한 케밥 네이밍으로 변환하면 ```<nuxt>```로도 쓸 수 있겠죠? 😃

<https://joshua1988.github.io/vue-camp/nuxt/intro.html#nuxt%E1%84%8B%E1%85%B4-%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%B7>
<https://mine-it-record.tistory.com/662>

<https://nuxtjs.org/>

# 설치

```npm init nuxt-app .```

```
create-nuxt-app v5.0.0
✨  Generating Nuxt.js project in .
? Project name: vue_nuxt
? Programming language: JavaScript
? Package manager: Npm
? UI framework: (Use arrow keys)
> None
? UI framework: None
? Template engine: HTML
? Nuxt.js modules: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Linting tools: ESLint, Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Continuous integration: None
? Version control system: Git
```

```npm run dev```

--------------------------------------------------------------------------------------------------


# 설명

    1. .nuxt : 페이지 빌드된 내용
    2. pages : 해당폴더 안에 파일을 생성하면 그 파일기반으로 라우팅이 이루어 진다.(페이지 기반 라우터 자동 생성)
    3. static : 정적인 파일을 넣어주면 된다.(파비콘이나 로봇파일)
    4. store : 스토어작성을 하면 된다.



1. 디렉토리 설정

디렉토리를 만들어서 임의로 변경할경우 (나의 경우는 src를 만든후 그안으로 옮겼다.)
nuxt.config.js 에서 경로를 잡아주어야한다.


    dir: {
        layouts: 'src/layouts',
        pages: 'src/pages',
        store: 'src/store',
        // middleware: 'src/middleware',
    },



이런식으로! 신기하게 주석이 //하고 바로 쓰면안돼고 // 띄워쓰기하고 써야 된다.

components의 경우 그전에는 이상하게 바로 꽂으니까 나오긴했는대
디렉토리를 변경한 후에는 import후 컴포넌트로 등록 후 불러오니 잘 나왔다.

*css의 경우 css란에 경로를 추가해 줄수 있지만
나의 경우 scss이므로 sass 설치 후 경로를 지정해 주었다.

    1. npm install --save-dev sass sass-loader@10 설치
    2. css: ```["~/assets/css/style.scss"]```,

+ 물결(~)표시는 절대경로를 쓰는 것인대 @로 써도 상관없다.
시작경로 폴더 자체를 지정도 해줄 수 있다고 한다.

<https://imkh.dev/vue-alias-path/>


2. pages안에 페이지 생성하기

    파일 생성 후 자동으로 라우팅되며 빌드 된다.(.nuxt/router.js에 routes부분에 자동으로 추가 및 삭제 등이 되어있는것을 확인 할 수 있다.)
    index.vue : 루트 페이지, 기본 인덱스
    앱의 페이지 사이를 이동하려면 NuxtLink 를 사용한다. ```<NuxtLink to="/about">```
    다릅 웹사이트로 이동시에는 a 태그를 사용한다.

3. 레이아웃

    헤더나 푸터 공통 레이아웃등이 있는 것을 만들때 
    layouts 폴더 생성 후 default.vue 로 만들면
    그것은 홈페이지의 기본 레이아웃의 된다.
    만약 다른 레이아웃을 사용할 경우라면 따로 만들고
    필요한 페이지에 

    layout: '만든레이아웃이름',

    으로 추가해주면 된다.(기본 레이아웃을 쓸경우에는 기입하지 않아도 된다.)

    + 에러페이지 
    layouts 폴더 안에  error.vue 를 생성 하면 에러페이지가 생성된다.
    props로 error를 받아와서 사용하면 상황에 따라 다른 error 페이지를 보여줄 수 있다.


3. backend 파일 클론 후 해당파일 위치에서(cd backend) 노드설치(npm i)후 npm run dev ♦️이때 실행되고 있었던 노드는 꺼주어야 한다.

    <https://jsonplaceholder.typicode.com/> 연습용 json 사이트: 파일기반의 api를 연습할 수 있음

    ```</products>``` 데이터연습


4. axios를 이용하여 data 호출 - 클라이언트

    1. npm i axios 설치 - 현재 프로젝트에서는 새로고침시 오류로 인해 axios 버전을 낮추었음(npm install axios@0.21.4)
    2. 포트변경 - 백엔드 서버가 기본 3000이라 클라이언트쪽 서버를 변경하였다
    nuxt.config.js 에 아래 코드 추가
    >
        server: {
            port: 5000 // default: 3000
        }

    +++ 콘솔창에 HMR
    HMR(Hot Module Replacement)
    HMR은 브라우저를 새로 고치지 않아도 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 도와주는 설정
    브라우저 새로 고침을 위한 LiveReload 대신에 사용할 수 있으며 웹팩 데브 서버와 함께 사용할 수도 있다.


5. 넉스트 rest api 호출방식 훅

    1. asyncData : 페이지 컴포넌트(pages 폴더 아래에 위치하는 컴포넌트)에만 제공되는 속성 - 컴포넌트가 생성되기 전에 생성되므로 this를 사용할 수 없음
    - page-level component에서만 사용가능합니다.
    - this 사용이 불가능하지만 context 객체를 사용할 수 있습니다.
    - return을 통해 로컬 data에 추가가 가능합니다.

    2. fetch
    - 컴포넌트와 페이지 모두에서 사용가능합니다.
    - this 사용이 가능합니다. (서버 사이드 렌더링을 위해 서버에서 화면을 구성할 때 컴포넌트가 생성되고 나서 실행됨)
    - return을 통해 로컬 data에 추가가 불가능합니다. ( fetch 결과를 local data에 mutate 시켜줘야 함 )
    - 브라우저에서 URL 주소를 변경해서 페이지를 이동할 때 호출됨
    -  파라미터를 넣을 수 없다.(여기서 뭔소린가 했는대 js fetch가 아니고 nuxt에서 제공하는 훅 fetch에서 사용할 수 없다는😂)

    😉fetch에서 제공하는 속성
    $fetchState : 데이터 호출 상태를 나타내는 속성이며 인스턴스로 접근할 수 있다. 호출 상태에 따라 pending, error, timestamp를 제공
    $fetch : fetch 로직을 다시 실행시킬 수 있는 함수
    fetchOnServer : 서버 사이드 렌더링 시에 서버에서 fetch를 실행할지 말지 결정하는 속성. 기본값은 true 

    <https://velog.io/@chaerin00/Nuxt-fetch-asyncData와-함께-NuxtServerInit-활용하기>
    <https://joshua1988.github.io/vue-camp/nuxt/data-fetching.html#fetch>
    <https://nuxtjs.org/docs/features/data-fetching/>


6. api 모듈화 시키기 

7. 검색창 만들기

8. 카트페이지 만들기

9. Vuex를 활용하여 카트페이지 만들기

    1. store폴더 아래 index.js를 만들면 .nuxt -> store.js에 자동으로 생성된다.
    2. vuex의 데이터 흐름은 Actions -> Mutations -> State 순서 (mutation = 동기적 로직을 수행, Actions은 비동기적 로직을 수행)
    3. vue 개발자도구 vuex에 추가된 모습을 확인 할 수 있다.
    4. 컴포넌트에서는 this.$store.commit('사용할 뮤테이션', 넘겨줄값); 하면 뷰개발자 도구에서 Timeline에 뮤테이션스에서 확인 할 수 있다.

10. 장바구니 조회 기능
자바스크립트이므로 새로고침시 데이터가 사라지므로 브라우저 저장소(로컬스트로지 등)을 이용하거나 서버에 저장하는 방법이 있다. 
(이전에 로컬스트로지 방법을 써봤으므로 api를 이용하여 서버에 저장하는 방식으로 구현)

11. 장바구니 목록 추가 기능 api 연동

12. 장바구니 조회 기능

    1. store에 actions를 이용하여 조회하기
    2. store에서는 commit으로 mutations 호출, 컴포넌트에서는 dispatch로 호출
    3. store 액션에서 호출하고 state에 셋업 후 접근하는 방식


13. nuxtServerInit(storeContext,nuxtContext)

    Nuxt 공식문서에 따르면 nuxtServerInit이 action에 정의되어있고, nuxt universal모드일 경우 Nuxt는 context객체와 함께 server-side에서 nuxtServerInit 훅을 호출
    client-side에 바로 전달해야하는 server에 있는 data가 있을 때 사용하면 유용하다고 하는데, client에서 화면이 그려지기전 server-side에서 처리해야하는 로직들을 nuxtServerInit에 정의할 수 있다.

    ssr을 위해서 사용하는대 asyncData를 하기 전에 호출하며 서버 store에 데이터를 미리 설정 해 준다.
    서버에서만 접근할 수 있는 데이터를 다룰때 유용하다.
    store의 actions에 정의 하면 된다.

    - storeContext 는 commit, state, dispatch 등이 있다.
    - nuxtContext 는 app,store,route,params 등  asyncData메서드의 context 파라미터와 같다.

14. 배포하기
SSR 모드로 생성한 웹 서비스는 배포하려는 서버에 Node.js 서버를 실행할 수 있는 형태로 배포해야 한다.

1. SSR (Server Side Rendering)
    
    >
        // nuxt.config.js
        export default {
        target: 'server'
        }

    2. SSG (Static Site Generation - API없이 사이트를 제작했을 때)
    
    >
        // nuxt.config.js
        export default {
        target: 'static'
        }

    ♦️버셀로 배포하기
    npm i vercel  
    vercel -v (버전확인)

    <https://joshua1988.github.io/vue-camp/nuxt/deployment.html>
    <https://velog.io/@jwun95/Nuxt.js-Vercel-%EB%B0%B0%ED%8F%AC>
    <https://iu-corner.tistory.com/entry/Nuxt%EB%A1%9C-Vercel%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0>
