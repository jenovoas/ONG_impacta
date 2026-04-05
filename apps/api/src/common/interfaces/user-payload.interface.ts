import { SystemRole } from '@impacta/database';

export interface UserPayload {
  userId: string;
  orgId: string;
  role: SystemRole;
  permissions: string[];
}
