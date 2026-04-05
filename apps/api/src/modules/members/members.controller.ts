import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ListMembersDto } from './dto/list-members.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { SystemRole } from '@impacta/database';

@Controller('members')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG, SystemRole.COORDINATOR)
  findAll(@Query() query: ListMembersDto, @Request() req: any) {
    return this.membersService.findAll(req.user.orgId, query);
  }

  @Get(':id')
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG, SystemRole.COORDINATOR)
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.membersService.findOne(req.user.orgId, id);
  }

  @Post()
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG)
  create(@Body() dto: CreateMemberDto, @Request() req: any) {
    return this.membersService.create(req.user.orgId, dto);
  }

  @Patch(':id')
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMemberDto,
    @Request() req: any,
  ) {
    return this.membersService.update(req.user.orgId, id, dto);
  }

  @Delete(':id')
  @Roles(SystemRole.SUPER_ADMIN)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.membersService.remove(req.user.orgId, id);
  }
}
