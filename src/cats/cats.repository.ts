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
    return !!(await this.catModel.exists({ email }));
  }

  async createCat(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(id: string): Promise<Cat | null> {
    return this.catModel.findOne({ id }).select('-password');
  }

  async findByIdAndUpdateImg(id: string, key: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = key;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findAll() {
    return await this.catModel.find();
  }
}
