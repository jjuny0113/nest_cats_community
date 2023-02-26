import { Schema, SchemaFactory, SchemaOptions, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};
@Schema(options)
export class Cat extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @ApiProperty({
    example: 'cat@cat.com',
    description: 'email',
    readOnly: true,
  })
  email: string;

  @ApiProperty({
    example: 'name',
    description: 'blue',
    readOnly: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    description: '1234',
    readOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsUrl()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
