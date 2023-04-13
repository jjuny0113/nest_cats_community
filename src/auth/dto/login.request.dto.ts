import { Cat } from './../../cats/cats.schema';
import { PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestDto extends PickType(Cat, ['email', 'password']) {}
