* 백엔드 배포하기

connect ECONNREFUSED 127.0.0.1:3000 에러가 난다.

서버에 사용한 api가 로컬에 있기 때문에 에러가 남

1. 로컬에 있는 api를 원격에 등록

    1. 별도의 데이터베이스가 담긴 json 파일을 만든다.
    2. json 파일만 모아둔 레파지토리 생성 후 1번을 푸쉬한다. 
    3. https://my-json-server.typicode.com/[깃허브아이디]/[2번이 담긴 레파지토리주소]
    를 접속하면 json 형태로 주소가 접속된다.
    예) <https://my-json-server.typicode.com/miseon920/json-api>

😉현업에서는 Swagger ui 많이 사용
<https://appmaster.io/university/ko/tutorials/endpoints/swagger-ran-mueosimyeo-sayong-bangbeob>


2. 기존 소스를 원격에 등록한 주소로 바라보게 변경

    api > index.js 의
    baseURL을 변경한다.

    1.  환경변수 만들기
        ♦️위치 : nuxt.config.js

        - server 경우 port를 개발환경에서는 5000번으로 하고 배포시에는 비움
        ```
        server: {
            port:process.env.NODE_ENV === 'production' ? null : 5000,
        },
        ```

        - env의 경우 개발환경에서는 로컬호스트 3000을 주소로 하고 배포시에는 실제 api가 있는 주소로 베이스url을 설정한다.
        ```
        env: {
            baseURL:process.env.NODE_ENV === 'production' ?
            'https://my-json-server.typicode.com/miseon920/json-api': 'http://localhost:3000',
        } 
        ```

    2. baseURL 변경하기

    ♦️위치 : api > index.js 에 baseURL을 nuxt.config.js에서 설정한 url로 변경한다. 

    ```
    const instance = axios.create({
    baseURL: process.env.baseURL,
    })
    ```


3. ssr  배포시 주의사항

    * 버셀 이슈 - (Error: The Serverless Function "index" is 93.44mb which exceeds the maximum size limit of 50mb. Learn More: <https://vercel.link/serverless-function-size>) = 용량  때문에 안됌..ㅠㅠ - dist만 올라가야하는대 전부 다 올라가서 생기는 문제로 파악됨

    ```
    // vercel.json 

    {
    "version": 2,
    "builds": [
        {
        "src": "nuxt.config.js",
        "use": "@nuxtjs/vercel-builder@0.21.3",
        "config": {
            "serverFiles": [
            "api/**",
            ".nuxt/dist/sitemap-routes.json"
            ]
        }
        }
    ]
    }

    // npm i @nuxtjs/vercel-builder@0.21.3
    ```

🥲위의 소스를 써도 안됌..멀해도 안됌 ㅠㅠ..캡틴판교님 얼른 올려주세요!



# ssr vs ssg

1. SSR
    - SSR 모드는 Deployment Target을 Server(Node.js hosting)으로 선택한 경우, 넉스트 설정 파일의 target 속성 값이 아래와 같이 server로 지정
    - 기본값은 서버이다.
    -  SSR 모드로 생성한 웹 서비스는 배포하려는 서버에 Node.js 서버를 실행할 수 있는 형태로 배포

    ```
    // nuxt.config.js
    export default {
    target: 'server'
    }
    ```

* 배포할 수 있는 플랫폼
예) vercel

2. SSG  

- SSG 모드는 Deployment Target을 Static(Static/Jamstack hosting)을 선택한 경우, 넉스트 설정 파일의 target 속성 값은 static으로 지정
- SSG 모드는 사용자의 페이지 URL 요청이 들어올 때마다 서버에서 그려서 브라우저에 보내주는 SSR 모드와 다르게 웹 서비스를 구성하는 모든 페이지를 미리 그려야 하기 때문에 스태틱 서버에 배포해야 한다.

    ```
    // nuxt.config.js
    export default {
    target: 'static'
    }
    ```

♦️nuxt는 기본값이 target: 'server' 이나 next는 'static' 이다.🙄

* 배포할 수 있는 플랫폼
예) Netlify


♦️JAMStack이란 JavaScript & API & Markup을 의미하며 API 서버 없이 사이트를 제작하는 방식을 의미


4. ssg로 배포

    1.  // nuxt.config.js 에  target:'static' 기입
    2.  npm run generate - ssg에서만 사용가능
    3. 배포시 Build command 를 npm run generate 로 변경

    -<https://v2.nuxt.com/deployments/netlify/>


5. SSG와 SSR 차이점

Static-Generation (추천) : HTML을 빌드 타임에 각 페이지별로 생성하고 해당 페이지로 요청이 올 경우 이미 생성된 HTML 문서를 반환
Server-Side-Rendering : 요청이 올 때 마다 해당하는 HTML 문서를 그때 그때 생성하여 반환

♦️ pre-rendering이란 각 페이지들을 사전에 미리 HTML 문서로 생성하여 가지고 있는 것


# 언제 뭘 쓰는가?

1. SSG 
- 퍼포먼스에 집중 (CDN을 통해 더 빠른 응답 가능)
- 마케팅 페이지 / 블로그 게시물 / 제품의 목록 등과 같이 정적 생성하여 각 요청에 동일한 문서를 반환할 수 있는 경우

2. SSR

- 항상 최신 상태를 유지해야 하는 경우 (요청에 따라 응답해야 할 내용이 시시각각 변함)
- 제품의 상세 페이지 / 분석 차트 등 요청 마다 다른 내용 또는 형식의 HTML 문서가 반환되는 경우

참고 👀
<https://velog.io/@longroadhome/FE-SSRServer-Side-Rendering-%EA%B7%B8%EB%A6%AC%EA%B3%A0-SSGStatic-Site-Generation-feat.-NEXT%EB%A5%BC-%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C>


# 메타태그 
nuxt.config.js 에서 head 속성을 설정해 주어야 한다.

<https://developer.mozilla.org/en-US/docs/Glossary/Metadata>


* 페이지 별로 메타태그 설정 하기(head 속성 정의하기)
- hid 가 같아야지 기존 헤드에 있던값을 씌우게 된다.


헤드 데이타에 뷰 데이타를 연결 시킬 때
해드 객체를 헤드 함수로 변경한다.

* 오픈 그래프 적용하기  = og

오픈그래프는 캐시가 있어서 적용되기 까지 시간이 걸린다.
이럴때 디버깅 도구를 통해서 캐시를 삭제 할 수 있다.

# 카카오와 페이스북에서 제공하는 디버깅 도구
<https://developers.kakao.com/tool/debugger/sharing>
<https://developers.facebook.com/tools/debug/>
