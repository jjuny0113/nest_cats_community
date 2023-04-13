import { AuthModule } from './../auth/auth.module';
import { CatsRepositroy } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MulterModule } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { AwsModule } from 'src/aws/aws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AwsModule),

    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
    ConfigModule,
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepositroy, AwsService],
  exports: [CatsService, CatsRepositroy],
})
export class CatsModule {}
