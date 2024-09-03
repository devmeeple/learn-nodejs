# 노드 웹 프로그래밍 Next Step

프레임워크를 사용하지 않고 Node 환경에서 HTTP 웹 서버를 구현한다.

# Node HTTP 웹 서버 구현

## 요구사항 0 - 개발 환경 구축

> 로그 메시지를 주의깊게 확인한다.

* **Hello, World!** 문자열을 출력하도록 HTTP 웹 서버를 구현한다.
* 원격 서버에 배포한다.
* 배포 작업은 root 계정이 아닌 배포를 담당할 새로운 계정을 만들어 진행한다.

## 요구사항 1 - `index.html` 응답하기

* `http://localhost:3000/index.html` 로 접속했을 때 `index.html` 파일을 읽어 클라이언트에 응답한다.

## 요구사항 2 - GET 방식으로 회원가입하기

* **회원가입** 메뉴를 클릭하면 `http://localhost:3000/user/form.html` 으로 이동하고 회원가입을 진행한다.

```text
/user/create?userId=meeple&password=password&name=TaeGeun&email=devmeeple%40gmail.com
```

* 사용자가 입력한 값이 위와 같이 서버에 전달된다.
* HTML과 URL을 비교하고 사용자가 입력한 값을 파싱해 `model.User` 클래스에 저장한다.

## 요구사항 3 - POST 방식으로 회원가입하기

* `http://localhost:3000/user/form.html` 파일의 form 태그 method를 get에서 post로 수정한 후 회원가입이 정상적으로 동작하도록 구현한다.

## 요구사항 4 - 302 status code 적용

* 회원가입을 완료하면 `/index.html` 페이지로 이동시킨다. (URL도 `/index.html`로 변경한다.)

## 요구사항 5 - 로그인 하기

* 로그인 메뉴를 클릭하면 `http://localhost:3000/user/login.html` 으로 이동해 로그인 할 수 있다.
* 로그인이 성공하면 `/index.html`로 이동하고, 실패하면 `/user/login_failed.html`로 이동한다.
* 로그인이 성공하면 쿠키를 활용해 로그인 상태를 유지한다.
    * 요청 헤더의 Cookie 헤더값이 logined=true, 실패하면 Cookie 헤더 값이 logined=false

## 요구사항 6 - 사용자 목록 출력

* **로그인** 상태일 경우 `http://localhost:3000/user/list` 로 접근했을 때 사용자 목록을 출력한다.
* 로그인 하지 않았다면 로그인 페이지(login.html)로 이동한다.

## 요구사항 7 - CSS 지원하기

* CSS 파일을 지원하도록 구현한다.

## 추가 학습 자료

* 로깅은 왜 필요한가?
    * 개발 단계에서는 `DEBUG`, 실 서비스를 배포할 때 `INFO, WARN` 사용
* HTTP
* 네트워크

# 리팩터링

## 요구사항 1 - 요청 데이터를 처리하는 로직을 별도의 클래스로 분리한다(HttpRequest)

## 요구사항 2 - 응답 데이터를 처리하는 로직을 별도의 클래스로 분리한다(HttpResponse)

## 요구사항 3 - 다형성을 활용해 클라이언트 요청 URL에 대한 분기 처리를 제거한다.

## 참고

* [자바 웹 프로그래밍 Next Step](https://product.kyobobook.co.kr/detail/S000001624682)