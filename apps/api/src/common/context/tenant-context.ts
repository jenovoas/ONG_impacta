import { AsyncLocalStorage } from 'async_hooks';

export class TenantContext {
  private static readonly storage = new AsyncLocalStorage<{ orgId: string }>();

  static run<T>(orgId: string, fn: () => T): T {
    return this.storage.run({ orgId }, fn);
  }

  static getOrgId(): string | undefined {
    return this.storage.getStore()?.orgId;
  }
}
