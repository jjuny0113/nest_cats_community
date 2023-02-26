import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../commmon/exceptions/http-exception.filter';
import { SuccessInterceptor } from './../commmon/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 400,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({
    description: 'body example',
    type: CatRequestDto,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.CatsService.signUp(body);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
