import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('/')
    async findAllByType(@Query('type') showType, @Query('page') pageNumber) {
        return await this.moviesService.findAll(showType, pageNumber);
    }

    @Post('/search')
    async findByContent(@Body() queries) {
        return await this.moviesService.findByContent(queries)
    }

    @Get('/:movieId')
    async findById(@Param('movieId') movieId) {
        return await this.moviesService.fetchById(movieId)
    }

    @Get('/:movieId/reviews')
    async fetchReviews(@Param('movieId') movieId, @Query('page') pageNumber) {
        return await this.moviesService.fetchMovieReviews(movieId, pageNumber)
    }

}
