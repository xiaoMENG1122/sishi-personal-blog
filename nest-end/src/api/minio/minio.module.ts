import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../file/entities/file.entity';
import {FileService} from "../file/file.service";

@Module({
  imports:[TypeOrmModule.forFeature([File])],
  controllers: [MinioController],
  providers: [MinioService,FileService],
  exports:[MinioService]
})
export class MinioModule {}
