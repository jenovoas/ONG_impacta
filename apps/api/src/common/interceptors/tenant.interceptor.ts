import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, defer } from 'rxjs';
import { TenantContext } from '../context/tenant-context';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orgId = user?.orgId;

    if (orgId) {
      return defer(() => TenantContext.run(orgId, () => next.handle()));
    }

    return next.handle();
  }
}
