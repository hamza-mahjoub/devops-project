import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectMetric } from '@willsoto/nestjs-prometheus/dist/injector';
import { Counter } from 'prom-client';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class TvService {

    backendUrl = null;

    constructor(private readonly httpService: HttpService,
        @InjectMetric("modules_metric") public modulesCounter: Counter<string>,
        private readonly configService: ConfigService) {
        this.backendUrl = `http://${configService.get('APP_BACKEND_HOST')}:${configService.get('APP_BACKEND_PORT')}/tv`
    }

    async findAll(type, page) {
        this.modulesCounter.inc({ 'module_name': 'tv' })

        return await lastValueFrom(
            this.httpService.get(`${this.backendUrl}/`, {
                params: { type, page },

            }).pipe(
                map(res => res.data)
            )
        );
    }

    async findByContent({ page, searchValue }) {
        this.modulesCounter.inc({ 'module_name': 'tv' })
        return await lastValueFrom(
            this.httpService.post(`${this.backendUrl}/search`, { page, searchValue }).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchById(tvShowId) {
        this.modulesCounter.inc({ 'module_name': 'tv' })
        return await lastValueFrom(
            this.httpService.get(`${this.backendUrl}/${tvShowId}`).pipe(
                map(res => res.data)
            )
        );
    }

    async fetchTvShowEpisodesBySeason({ tvId, seasonNumber }) {
        this.modulesCounter.inc({ 'module_name': 'tv' })
        return await lastValueFrom(
            this.httpService.get(`${this.backendUrl}/${tvId}/season/${seasonNumber}`).pipe(
                map(res => res.data)
            )
        );
    }
}
