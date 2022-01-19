## Music Scraper

1. 구동 환경
    - node : v14.16.0
2. 사용 언어
    - Typescript
3. 라이브러리
    - 통신목적의 axios, 테스팅을 위한 jest, 코드 정리를 위한 eslint.
4. 결과 확인
    - src폴더 내의 index.test.ts 의 테스팅 실행
5. 프로젝트 작동 방식
    - `GetMusicRankService` 는 음원 순위를 조회합니다. 생성 시점에 사업자에 맞는 `repository` 가 주입되어야 합니다.
    - 서비스가 실행되면,  `repository` 에서 음원사업자로 호출을 합니다. 각 사업자 별로 `repository`의 메소드가 2회 실행됩니다. 첫 번째로 음원 순위정보(`ResponseMusicDetail`) 를 조회하게 되고, 순위 정보 배열을 기반을 앨범정보를 (`ResponseAlbumDetail`) 호출하게 됩니다.
    - 메소드 실행 후에 `dto` 팩토리에서 태그 파싱을 하고 `dto`를 전달합니다.
    - 모든 호출이 끝나고 나면 `ResponseMusicDto` 배열을 리턴합니다.
    - 서비스에서는 `dto`를 기반으로 애플리케이션 레이어 밖으로 전달될 결과값 `dto`(`Music`) 를 생성합니다.

   ## Parser 동작 관련

    1. 텍스트를 받아 원하는 태그 범위로 조절합니다.
       예) `body` 부터 `/body` 까지, `tbody` 부터 /`tbody` 까지

       이때 파서 내의 불필요한 공백 등을 제거 하는 파이프를 같이 수행합니다.

       파이프 마지막에는 정규표현식으로 태그를 분리해서 문자열 배열로 변환합니다.

    2. 배열을 순회하면서 요소들을 만들고, 스택에 쌓습니다.
       스택에 쌓을 때 마다 캐시 클래스에 클래스 별, 아이디 별, 태그명 별로 저장됩니다.
    3. 종료태그가 들어오면 스택의 가장 위쪽의 태그를 조회해서 맞는지 확인하고 스택에서 제거합니다.
       이때 매칭이 되지 않으면 HTML 커스텀 에러가 발생합니다.
    4. 순회가 끝나고 나면 저장된 캐시와 루트 노드가 리턴됩니다.
       루트 노드는 테스팅의 목적이고, 실제 서비스에서는 캐시만 이용합니다.

   ### `MergeMusicRankService` 클래스

    1. 해당 클래스는 생성 시점에 음원 사업자 리스트를 전달받습니다. 전달 받은 리스트를 가지고 사업자 별 repository를 생성 및 사업자별  `GetMusicRankService` 를 생성하면서 repo 를 주입합니다.
    2. 병렬 처리 결과를 기다렸다가 과제 수행의 결과인 `GetMusicRankDto`  를 리턴합니다.

    ```tsx
    export interface GetMusicRankDto {
      melon: Music[],
      genie: Music[],
      vibe: Music[],
    }
    ```