import { Cat } from './../cats.schema';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name']) {
  @ApiProperty({
    example: '29393',
    description: 'id',
  })
  id: string;
}
