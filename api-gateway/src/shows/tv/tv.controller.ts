import { Controller, Get, Param, Post, Query, Body, Logger, Req, UseInterceptors } from '@nestjs/common';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { TvService } from './tv.service';

@UseInterceptors(AuthInterceptor)
@Controller('shows/tv')
export class TvController {

    constructor(private readonly tvService: TvService) { }

    @Get('/')
    async findAllByType(@Query('type') showType, @Query('page') pageNumber, @Req() req) {
        return await this.tvService.findAll(showType, pageNumber);
    }

    @Post('/search')
    async findByContent(@Body() queries) {
        return await this.tvService.findByContent(queries)
    }

    @Get('/:tvId')
    async findById(@Param('tvId') tvId) {
        return await this.tvService.fetchById(tvId)
    }

    @Get('/:tvId/season/:seasonNumber')
    async findEpisodesByShowAndSeason(@Param() params) {
        return await this.tvService.fetchTvShowEpisodesBySeason(params)
    }
}
