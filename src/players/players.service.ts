import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class PlayersService {

    constructor(private readonly prismaService: PrismaService) {}

    create(body: {name: string, foot: Foot}){
        return this.prismaService.player.create({
            data: {
                name: body.name,
                foot: body.foot,
             }
        });
    }

    getAll(foot?: Foot){
        if (foot){
            return this.prismaService.player.findMany({
                where: {
                    foot
                }
            })
        }

        return this.prismaService.player.findMany();
    }

    getOne(id: number){
        return this.prismaService.player.findFirst(
            {
                where: {id},
                include: {
                    teams: {
                        include: {
                            team: true
                        }
                    }
                }
            });
    }
}

enum Foot {
    Left = 'Left',
    Right = 'Right',
}
