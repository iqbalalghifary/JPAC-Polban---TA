import { 
  Controller, 
  Get, 
  Param, 
  Post, 
  Put, 
  UseInterceptors, 
  UploadedFile,
  Body,
  Delete,
  UseGuards
} from '@nestjs/common';
import { AlumniRegisterDto } from '../core/dtos';
import { AlumniUseCases } from '../use-cases/alumni';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Alumni } from '../core';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth.guard';
import { RoleAuthGuard } from 'src/app/guard/roles-auth.guard';
import { Roles } from 'src/app/guard/roles-decorator';

@Controller('api/alumni')
export class AlumniController {
  constructor(
    private alumniUseCases: AlumniUseCases
  ) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Get()
  getAll() {
    return this.alumniUseCases.getAllAlumnis();
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Get(':id')
  getById(@Param('id') alumniId: string) {
    return this.alumniUseCases.getAlumniById(alumniId);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Post('register')
  registerAlumni(@Body() datas: AlumniRegisterDto) {
    return this.alumniUseCases.registerAlumni(datas);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Put('verify/:id')
  verifyAlumni(@Param('id') alumniId: string) {
    return this.alumniUseCases.verifyAlumni({ id: alumniId, payload: { status: 'diverifikasi' } });
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Put('activate/:id')
  activateAlumniAccount(@Param('id') alumniId: string) {
    return this.alumniUseCases.activateAlumni({ id: alumniId, payload: { status: 'aktif' } });
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Delete(':id')
  deleteAlumni(@Param('id') alumniId: string) {
    return this.alumniUseCases.deleteAlumni(alumniId);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Put('upload-receipt/:id')
  @UseInterceptors(FileInterceptor('receipt', {
    storage: diskStorage({
      destination: './uploads/receipt',
      filename: (_, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename)
      }
    }),
  }))
  uploadReceipt(
    @Param('id') alumniId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.alumniUseCases.uploadReceipt({ id: alumniId, receipt: file.path });
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('Alumni')
  @Put(':id')
  updateAlumni(
    @Param('id') alumniId: string,
    @Body() datas: Alumni,
  ) {
    return this.alumniUseCases.updateAlumni({ id: alumniId, payload: datas });
  }
}