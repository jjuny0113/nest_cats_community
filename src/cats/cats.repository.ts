import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';

interface ICatsRepositroy {
  findByEmail(email: string): Promise<boolean>;
  createCat(cat: CatRequestDto): Promise<Cat>;
}

@Injectable()
export class CatsRepositroy implements ICatsRepositroy {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async findByEmail(email: string): Promise<boolean> {
    return !!this.catModel.exists({ email });
  }

  async createCat(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }
}
