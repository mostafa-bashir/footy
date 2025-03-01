import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {

    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    create(@Body() body: {name: string}){
        return this.teamsService.create(body.name);
    }

    @Get()
    getAll(){
        return this.teamsService.getAll();
    }

    @Post('assign')
    assignPlayer(@Body() body: {teamId: string, playerId: string}){
        this.teamsService.assignPlayer(+body.teamId, +body.playerId)
    }
}
