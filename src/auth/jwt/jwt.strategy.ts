import { CatsRepositroy } from './../../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepositroy: CatsRepositroy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepositroy.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (!cat) throw new UnauthorizedException('접근오류');
    return cat;
  }
}
