import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
} from '@nestjs/common';
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    console.log(value);
    if (value < 0) {
      throw new HttpException('value는 0보다 커야합니다.', 400);
    }
    return value;
  }
}
