import { Controller, Post, Body, Get, Query, ParseEnumPipe, Optional, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayersService } from './players.service';

enum Foot {
    Left = 'Left',
    Right = 'Right',
}

@Controller('players')
export class PlayersController {
    constructor(private readonly prismaService: PrismaService, private readonly playerService: PlayersService) {}
  
    @Post()
    async create(@Body() body: {name: string, foot: Foot}){
        return this.playerService.create(body)
    }

    @Get()
    async getAll(@Query('foot', new ParseEnumPipe(Foot, {optional: true})) foot?: Foot){
        return this.playerService.getAll(foot);
    }

    @Get(':id')
    async getOne(@Param('id') id: string){
       const player = await this.playerService.getOne(+id);

       if(!player){
        throw new NotFoundException(`Player with ID ${id} not found`);
       }

       return player;
    }
}



