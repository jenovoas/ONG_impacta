import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Public()
  @Post('callback')
  handleCallback(
    @Body() body: { gatewayRef: string; status: 'SUCCEEDED' | 'FAILED' },
  ) {
    return this.donationsService.handleCallback(body.gatewayRef, body.status);
  }
}
