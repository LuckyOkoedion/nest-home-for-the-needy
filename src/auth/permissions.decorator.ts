import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissionsValue: string[]) => SetMetadata('permissions', permissionsValue);
