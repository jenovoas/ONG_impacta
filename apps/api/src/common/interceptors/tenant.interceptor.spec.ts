import { TenantInterceptor } from './tenant.interceptor';
import { TenantContext } from '../context/tenant-context';
import { of } from 'rxjs';

describe('TenantInterceptor', () => {
  let interceptor: TenantInterceptor;

  beforeEach(() => {
    interceptor = new TenantInterceptor();
  });

  it('debe envolver el handle con TenantContext.run si el request tiene user.orgId', (done) => {
    const orgId = 'test-org-123';
    const request = { user: { orgId } };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as any;

    const next = {
      handle: () => {
        // Dentro de este "handle" simulado, el orgId debería estar disponible
        expect(TenantContext.getOrgId()).toBe(orgId);
        return of('resp');
      },
    } as any;

    interceptor.intercept(context, next).subscribe({
      next: (val) => {
        expect(val).toBe('resp');
      },
      complete: () => {
        // Al terminar el interceptor, el contexto debería limpiarse (esto lo hace AsyncLocalStorage)
        done();
      },
    });
  });

  it('no debe afectar el TenantContext si no hay orgId', (done) => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as any;

    const next = {
      handle: () => {
        expect(TenantContext.getOrgId()).toBeUndefined();
        return of('resp');
      },
    } as any;

    interceptor.intercept(context, next).subscribe({
      complete: () => done(),
    });
  });
});
