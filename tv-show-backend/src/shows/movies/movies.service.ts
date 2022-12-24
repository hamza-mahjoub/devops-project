import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { lastValueFrom, map } from 'rxjs';
@Injectable()
export class MoviesService {
    constructor(private readonly httpService: HttpService,
        @InjectMetric("movies_metric") public moviesCounter: Counter<string>) {

    }

    async findAll(type, page) {
        this.moviesCounter.inc({ 'type': type })
        return await lastValueFrom(
            this.httpService.get(`/movie/${type}`, {
                params: { page },

            }).pipe(
                map(res => res.data)
            )
        );
    }

    async findByContent({ page, searchValue }) {
        return await lastValueFrom(
            this.httpService.get(`/search/movie`, {
                params: { page, query: searchValue },

            }).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchById(movieId) {
        return await lastValueFrom(
            this.httpService.get(`/movie/${movieId}`).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchMovieReviews(movieId, page) {
        return await lastValueFrom(
            this.httpService.get(`/movie/${movieId}/reviews`, {
                params: { page },

            }).pipe(
                map(res => res.data)
            )
        );
    }

}

