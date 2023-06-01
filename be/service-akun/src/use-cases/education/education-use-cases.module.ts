import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../core/db/db-data-services.module';
import { CarouselUseCases } from './education.use-case';

@Module({
  imports: [MongoDataServicesModule],
  providers: [CarouselUseCases],
  exports: [CarouselUseCases],
})
export class CarouselUseCasesModule {}
