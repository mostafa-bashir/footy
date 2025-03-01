import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class TeamsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(name: string){
        return await this.prismaService.team.create({ data: { name } });
    }

    async getAll(){
        return await this.prismaService.team.findMany({
            include: {
                players: {
                    include: {
                        player: true
                    },
                }
            }
        });
    }

    async assignPlayer(teamId: number, playerId: number){

        const team = await this.prismaService.team.findUnique({where: {id: teamId}})

        if(!team){
            throw new NotFoundException(`Team with ID ${teamId} not found`);
        }


        const player = await this.prismaService.player.findUnique({where: {id: playerId}})

        if(!player){
            throw new NotFoundException(`Player with ID ${playerId} not found`);
        }

        return await this.prismaService.teamPlayer.create({
            data: {
                teamId,
                playerId
            }
        })
    }
}
