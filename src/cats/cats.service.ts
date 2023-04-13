import { AwsService } from './../aws/aws.service';
import { Cat } from './cats.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepositroy } from './cats.repository';
import { Builder } from 'builder-pattern';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepositroy: CatsRepositroy,
    private readonly awsService: AwsService,
  ) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepositroy.findByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCat = Builder(CatRequestDto)
      .email(email)
      .name(name)
      .password(hashedPassword)
      .build();

    const cat = await this.catsRepositroy.createCat(newCat);

    return cat.readOnlyData;
  }

  async uploadImg(file: Express.Multer.File) {
    console.log('service', file.buffer);
    const uploadFile = await this.awsService.uploadFileToS3('cats', file);
    // await this.catsRepositroy.findByIdAndUpdateImg(
    //   cat.id,
    //   uploadFile.key,
    // );
    console.log('uploadFile', uploadFile);
    return uploadFile;
  }

  async getAllCat() {
    return (await this.catsRepositroy.findAll()).map((v) => v.readOnlyData);
  }
}
