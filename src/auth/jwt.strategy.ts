import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "@prisma/prisma.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private prismaService: PrismaService, private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret'
        });

    }

    async validate(payload: any){
        const user = await this.prismaService.user.findUnique({where: {id: payload.sub}});
        if (!user) throw new UnauthorizedException('Invalid token');
        return user;
    }
}