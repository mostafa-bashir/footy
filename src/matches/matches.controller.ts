import { Body, Controller, Get, Post } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
    constructor(private readonly matchesService: MatchesService){}

    @Post()
    async create(@Body() body: {teamAId: number, teamBId: number, date: Date}){
        return await this.matchesService.create(body.teamAId, body.teamBId, body.date);
    }

    @Post('goal')
    async goal(@Body() body: {matchId: number, teamId: number}){
        const {matchId, teamId} = body;
        return await this.matchesService.goalScored(matchId, teamId);
    }

    @Post('mvp')
    async mvp(@Body() body: {matchId: number, playerId: number}){
        const {matchId, playerId} = body;
        return await this.matchesService.setMVP(matchId, playerId);
    }

    @Get()
    async getAll(){
        return await this.matchesService.getMatches();
    }
}
