import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus/dist/injector';
import { Counter } from 'prom-client';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class TvService {
    constructor(private readonly httpService: HttpService,
        @InjectMetric("tv_metric") public tvCounter: Counter<string>) {
    }

    async findAll(type, page) {
        this.tvCounter.inc({ 'type': type })
        return await lastValueFrom(
            this.httpService.get(`/tv/${type}`, {
                params: { page },

            }).pipe(
                map(res => res.data)
            )
        );
    }

    async findByContent({ page, searchValue }) {
        return await lastValueFrom(
            this.httpService.get(`/search/tv`, {
                params: { page, query: searchValue },

            }).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchById(tvShowId) {
        return await lastValueFrom(
            this.httpService.get(`/tv/${tvShowId}`).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchTvShowEpisodesBySeason({ tvId, seasonNumber }) {
        return await lastValueFrom(
            this.httpService.get(`/tv/${tvId}/season/${seasonNumber}`).pipe(
                map(res => res.data)
            )
        );
    }
}
