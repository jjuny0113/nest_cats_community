import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  helloCat() {
    return 'hello cats';
  }
}
