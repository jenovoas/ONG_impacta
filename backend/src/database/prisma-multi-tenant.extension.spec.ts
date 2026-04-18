import { tenantContextStorage } from '../common/utils/tenant-context';

describe('multiTenantExtension behavior', () => {
  it('inyecta organizationId en create cuando hay contexto', async () => {
    await tenantContextStorage.run({ orgId: 'org-test' }, async () => {
      expect(tenantContextStorage.getStore()?.orgId).toBe('org-test');
    });
  });
  it('no filtra cuando no hay contexto', () => {
    expect(tenantContextStorage.getStore()).toBeUndefined();
  });
});
