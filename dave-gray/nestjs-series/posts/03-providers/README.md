# 03. Providers

- `Provider`란 주입될 수 있는 객체를 의미한다. (예: services, repositories ...)
- provider는 복잡한 로직을 제공한다.
- `@Injectable`: IoC 컨테이너에 관리를 요청

## Dependency injection

```typescript
export class App {
  constructor(private readonly appService: AppService) {
  }
}
```

생성자를 통해 주입된다.

### DI는 무엇인가? 왜 필요한가?

### SingleTon

### IoC

제어의 역전

