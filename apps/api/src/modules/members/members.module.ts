import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  controllers: [MembersController],
  providers: [MembersService, RolesGuard],
})
export class MembersModule {}
