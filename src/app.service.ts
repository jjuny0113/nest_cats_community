import { CatsService } from './cats/cats.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly catsService: CatsService) {}
  getHello(): string {
    return this.catsService.helloCat();
  }
}
