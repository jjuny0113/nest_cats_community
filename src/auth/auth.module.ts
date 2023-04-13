import { CatsModule } from './../cats/cats.module';
import { CatsRepositroy } from './../cats/cats.repository';
import { JwtStartegy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1y',
      },
    }),
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStartegy],
  exports: [AuthService],
})
export class AuthModule {}
