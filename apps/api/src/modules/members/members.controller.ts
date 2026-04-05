import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ListMembersDto } from './dto/list-members.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserPayload } from '../../common/interfaces/user-payload.interface';
import { SystemRole } from '@impacta/database';

@ApiTags('members')
@ApiBearerAuth()
@Controller('members')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG, SystemRole.COORDINATOR)
  @ApiOperation({ summary: 'Listar miembros con paginación y filtros' })
  @ApiResponse({ status: 200, description: 'Lista de miembros' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(@Query() query: ListMembersDto, @CurrentUser() user: UserPayload) {
    return this.membersService.findAll(user.orgId, query);
  }

  @Get(':id')
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG, SystemRole.COORDINATOR)
  @ApiOperation({ summary: 'Obtener un miembro por ID' })
  @ApiResponse({ status: 200, description: 'Miembro encontrado' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
  findOne(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.membersService.findOne(user.orgId, id);
  }

  @Post()
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG)
  @ApiOperation({ summary: 'Crear un nuevo miembro' })
  @ApiResponse({ status: 201, description: 'Miembro creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() dto: CreateMemberDto, @CurrentUser() user: UserPayload) {
    return this.membersService.create(user.orgId, dto);
  }

  @Patch(':id')
  @Roles(SystemRole.SUPER_ADMIN, SystemRole.ADMIN_ONG)
  @ApiOperation({ summary: 'Actualizar un miembro' })
  @ApiResponse({ status: 200, description: 'Miembro actualizado' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMemberDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.membersService.update(user.orgId, id, dto);
  }

  @Delete(':id')
  @Roles(SystemRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Eliminar un miembro' })
  @ApiResponse({ status: 200, description: 'Miembro eliminado' })
  @ApiResponse({ status: 404, description: 'Miembro no encontrado' })
  remove(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.membersService.remove(user.orgId, id);
  }
}
