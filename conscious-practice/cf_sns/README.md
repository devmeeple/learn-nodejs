# 의식적인 연습

제공되는 강의에 테스트를 추가하고 정리한다.

## 5. 쿼리와 파라미터

다음은 REST API 기본 설계 예시이다. GET 요청을 제외하고는 대부분 Body를 사용한다.

```text
[GET] /posts 
> 다수의 글을 가져온다. (전체조회)
[GET] /posts/10 
> 10이라는 id를 가진 글을 가져온다. (단건조회)
[POST] /posts 
> 새로운 글을 작성한다. (글 작성)
[PATCH] /posts/10 
> 10이라는 id를 가진 글을 부분 변경한다. (업데이트/수정)
[PUT] /posts/10
> 10이라는 id를 가진 글을 전체 변경하거나 생성한다. (업데이트/수정)
[DELETE] /posts/10
> 10이라는 id를 가진 글을 삭제한다. (삭제)
```

- PATCH VS PUT
    - PATCH는 변경하고 싶은 부분만 전송해도 되지만, PUT은 필요한 데이터 전체를 전송해야 한다.

### Exception

[상위 4개](https://docs.nestjs.com/exception-filters)의 항목을 주로 사용한다.