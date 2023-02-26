import { SuccessInterceptor } from './../commmon/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../commmon/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/commmon/pipe/positiveInt.pipe';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Get()
  getAllCats() {
    throw new HttpException('api is broken', HttpStatus.FORBIDDEN);
    return 'call cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) parma) {
    console.log(parma);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return;
  }

  @Delete(':id')
  deleteCat() {
    return;
  }
}
