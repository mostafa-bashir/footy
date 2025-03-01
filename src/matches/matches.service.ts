import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class MatchesService {
    constructor(private readonly prismaService: PrismaService){}

    async create(teamAId: number, teamBId: number, date: Date){
        return await this.prismaService.match.create({
            data: {
                teamAId,
                teamBId,
                date,
                scoreA: 0,
                scoreB: 0,
            }
        })
    }

    async goalScored(matchId: number, scorerTeamId: number){
        const match = await this.prismaService.match.findUnique({
            where: {
                id: matchId
            }
        })

        if (!match) {
            throw new NotFoundException(`Match with ID ${matchId} not found`);
        }

        let updatedMatch;
        if(match?.teamAId == scorerTeamId){
            updatedMatch = await this.prismaService.match.update({
                where: {
                    id: matchId
                },
                data: {
                    scoreA: match.scoreA+1
                }
            })
        }else if(match?.teamBId == scorerTeamId){
            updatedMatch = await this.prismaService.match.update({
                where: {
                    id: matchId
                },
                data: {
                    scoreB: match.scoreB+1
                }
            })        
        }else{
            throw new NotFoundException(`Team with ID ${scorerTeamId} is not in this match`);
        }
    }

    async setMVP(matchId: number, playerId: number){
        const match = await this.prismaService.match.findUnique({
            where: {
                id: matchId
            }
        })

        if(!match){
            throw new NotFoundException(`Match with ID ${matchId} not found`);
        }

        const player = await this.prismaService.player.findUniqueOrThrow({
            where: {
                id: playerId
            },            
        }).catch(() => {
            throw new NotFoundException(`Player with ID ${playerId} not found`)
        })

        const updatedMatch = await this.prismaService.match.update({
            where: {
                id: matchId
            },
            data: {
                mvpId: playerId
            }
        })
    }

    async getMatches(){
        return this.prismaService.match.findMany({
            include: {
                teamA: true,
                teamB: true,
                mvp: true
            }
        })
    }
}
