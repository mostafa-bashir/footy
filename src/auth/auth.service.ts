import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prismaService: PrismaService) {}

    async validateUser(email: string, password: string){
        const user = await this.prismaService.user.findUnique({where: {email}});

        if(!user) throw new UnauthorizedException('Invalid credentials');

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) throw new UnauthorizedException('Invalid credentials');

        return user
    }

    async login(email: string, password: string){
        const user = await this.validateUser(email, password);

        const payload = {sub: user.id, email: user.email};
        const token = this.jwtService.sign(payload);

        return {token};
    }

    async register(email: string, password: string){
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaService.user.create({
            data: {
                email, 
                name: email,
                password: hashedPassword,
                role: 'Admin',
            }
        })

        return {user}
    }
}
