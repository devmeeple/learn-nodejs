# 요구사항 2 - GET 방식으로 회원가입하기

> * 회원가입을 하면 다음과 같은 형태로 사용자가 입력한 값이 서버에 전달된다.
> * /user/create?userId=javajigi&password=password&name=JaeSung&email=javajigi%40slipp.net
> * 사용자가 입력한 값을 model.User 클래스에 저장한다.

문제를 해결하기 위해서는 사용자의 요청을 파싱해야 한다.

## 🙂 해결

이전에 사용하던 `url.parse()` 함수는 더 이상 제공되지 않는다. 문제를 해결하기 위해서는 다른 방법을 강구해야 한다.

```
url.parse(urlString[, parseQueryString[, slashesDenoteHost]]); -> new URL(input[,base]); 
```

## 🏝️ 쉬어가기

### 파싱(Parsing)

> 파서(parser): 위와 같은 역할을 하는 함수 또는 프로그램

파싱이란 웹 페이지에서 원하는 데이터를 추출하여 가공하기 쉬운 상태로 바꾸는 작업을 의미한다.

