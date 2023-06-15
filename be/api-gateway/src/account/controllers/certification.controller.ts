import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CertificationUseCases } from '../use-cases/certification';
import { Certification } from '../core';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth.guard';
import { RoleAuthGuard } from 'src/app/guard/roles-auth.guard';
import { Roles } from 'src/app/guard/roles-decorator';

@Controller('api/certification')
export class CertificationController {
  constructor(
    private certificationUseCases: CertificationUseCases,
  ) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Get()
  getAll() {
    return this.certificationUseCases.getAllCertifications();
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Get(':id')
  getById(@Param('id') id: any) {
    return this.certificationUseCases.getCertificationById(id);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Post()
  createCertification(@Body() datas: Certification) {
    return this.certificationUseCases.createCertification(datas);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Put(':id')
  updateCertification(
    @Param('id') CertificationId: string,
    @Body() datas: Certification,
  ) {
    return this.certificationUseCases.updateCertification({ id: CertificationId, payload: datas });
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Delete(':id')
  deleteCertification(@Param('id') CertificationId: string) {
    return this.certificationUseCases.deleteCertification(CertificationId);
  }

}