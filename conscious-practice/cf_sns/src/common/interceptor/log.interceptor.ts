import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = new Date();
    const request = context.switchToHttp().getRequest();
    const path = request.originalUrl;
    console.log(`[REQ] ${path} ${now.toLocaleString('kr')}`);
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `[RES] ${path} ${new Date().toLocaleString('kr')} ${
              new Date().getMilliseconds() - now.getMilliseconds()
            }ms`,
          ),
        ),
      );
  }
}
