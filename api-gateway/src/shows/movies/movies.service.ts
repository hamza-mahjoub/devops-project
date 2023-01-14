import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { lastValueFrom, map } from 'rxjs';
@Injectable()
export class MoviesService {

    backendUrl = null;

    constructor(private readonly httpService: HttpService,
        @InjectMetric("modules_metric") public modulesCounter: Counter<string>,
        private readonly configService: ConfigService) {
        this.backendUrl = `http://${configService.get('APP_BACKEND_HOST')}:${configService.get('APP_BACKEND_PORT')}/movies`
    }


    async findAll(type, page) {
        this.modulesCounter.inc({ 'module_name': 'movie' }) 
        return await lastValueFrom(
            this.httpService.get(`${this.backendUrl}/`, {
                params: { type, page },

            }).pipe(
                map(res => res.data)
            )
        );
    }

    async findByContent({ page, searchValue }) {
        this.modulesCounter.inc({ 'module_name': 'movie' })
        return await lastValueFrom(
            this.httpService.post(`${this.backendUrl}/search/movie`, { page, searchValue }).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchById(movieId) {
        this.modulesCounter.inc({ 'module_name': 'movie' })
        return await lastValueFrom(
            this.httpService.get(`${this.backendUrl}/${movieId}`).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchMovieReviews(movieId, page) {
        this.modulesCounter.inc({ 'module_name': 'movie' })
        return await lastValueFrom(
            this.httpService.get(`${this.backendUrl}/${movieId}/reviews`, {
                params: { page },

            }).pipe(
                map(res => res.data)
            )
        );
    }

}

