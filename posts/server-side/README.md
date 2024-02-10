# Server-side website programming

> [서버사이드 프로그래밍](https://developer.mozilla.org/en-US/docs/Learn/Server-side)

The Dynamic Websites - Server-side programming topic is a series of modules that show how to create dynamic websites;

> 동적인 웹 사이트 / 서버사이드 프로그래밍 주제는 동적인 웹사이트를 만드는 방법을 보여주는 과목 시리즈다.

websites that deliver customized information in response to HTTP requests.

> HTTP 요청에 대한 응답으로 맞춤형 정보를 전달하는 웹사이트이다.

The modules provide a general introduction to server-side programming, along with specific beginner-level guides on
how to use the Django(Python) and Express(Node.js/JavaScript) web frameworks to create basic applications.

> 이 과목은 서버 측 프로그래밍에 대한 일반적인 소개와 함께 초보자 수준의 가이드를 제공한다.
> Django(Python), Express(Node.js/JavaScript) 웹 프레임워크를 사용해서 기본적인 애플리케이션을 만드는 방법을 설명한다.

Most major websites use some kind of server-side technology to dynamically display data as required.

> 대부분의 주요 웹사이트는 필요에 따라 데이터를 동적으로 표시하기 위해 서버 측 기술을 사용한다.

For example, imagine how many products are available on Amazon, and imagine how many posts have been written on
Facebook.

> 예를들어 아마존(Amazon)에 이용가능한 얼마나 많은 상품이 있는지, 페이스북(Facebook)에 얼마나 많은 글을 작성할 수 있는지 상상해보자.

Displaying all of these using different static pages would be extremely inefficient, so instead such sites display
static templates(built using HTML, CSS, and JavaScript), and then dynamically update the data displayed inside those
templates when needed, such as when you want to view a different product on Amazon.

> 서로 다른 정적 페이지(static pages)를 사용해서 모든것을 표시하는 것은 몹시 비효율적이므로 이러한 사이트에서는 대신 다음을 표시한다.
> 정적 템플릿(HTML, CSS, JavaScript를 사용하여 만듬)을 표시한 다음 해당 템플릿 내부에 표시되는 데이터를 동적으로 업데이트 한다.
> (예: 아마존에서 다른 상품을 보고 싶을 때)

In the modern world of web development, learning about server-side development is highly recommended.

> 현대 웹 개발에서, 서버-사이드 개발에 대해 배우는 것을 몹시 추천한다.

## Learning pathway

> 학습 방법

Getting stated with server-side programming is usually easier than client-side development, because dynamic websites
tend to perform a lot of very similar operations(retrieving data from a database and displaying it in a page,
validating user-entered data and saving it in a database, checking user permissions and logging user in, etc.), and
are constructed using web frameworks that make these and other common webserver operations easy.

> 일반적으로 동적 웹사이트는 유사한 작업을 많이 수행하는 경향이 있기 때문에 클라이언트 측 개발보다 서버 측 프로그래밍으로 시작하는 것이 더 쉽다.
> 또한 이런 작업들과 다른 공통적인 웹 서버 작업을 쉽게 해주는 웹 프레임워크가 있기 때문이다.
> * 유사한 작업(데이터베이스에서 페이지에 표시될 데이터 검색하기, 사용자 데이터 유효성 검사와 저장, 사용자 권한 확인, 로그인 등...)

Basic knowledge of programming concepts (of a particular programming language) is useful, but not essential.

> 프로그래밍 개념(특정한 프로그래밍 언어)에 관한 기본지식은 유용하지만 필수적인 것은 아니다.

Similarly, expertise in client-side coding is not required, but a basic knowledge will help you work better with the
developers creating your client-side web "front end"

> 마찬가지로 클라이언트측 전문지식은 필수는 아니지만 기본지식은 프론트엔드(클라이언트-사이드) 개발자와 일 하는데 도움이 될 것이다.

You will need to understand "how the web works." We recommend that you first read the following topics:

> 당신은 "웹의 동작 방식"을 이해해야 한다. 먼저 다음 주제들을 읽어볼것을 추천한다.

* What is a web server. (웹 서버는 무엇인가.)
* What software do I need to build a website? (웹사이트를 만들기 위해 필요한 소프트웨어는 무엇인가?)
* How do you upload files to a web server? (웹 서버에 파일을 업로드 하는 방법은 무엇인가?)

With that basic understanding, you'll be ready to work your way through the modules in this section.

> 기본적인 이해를 바탕으로 섹션의 과목들을 진행할 준비가 되었다.

## 📝 단어장

* deliver: 전달하다
* along with: ~와 함께
* some kind of: 어떤 종류의
* available: 사용 가능
* extremely inefficient: 매우 비효율적
* usually: 보통, 일반적으로
* tend: 경향
* similar: 유사한, 비슷하게
* constructed: 구성된
* particular: 특정, 특별한
* essential: 필수적인
* expertise: 전문 지식