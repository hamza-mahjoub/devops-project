import { Module } from '@nestjs/common';
import { TvController } from './tv/tv.controller';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { TvService } from './tv/tv.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('TMDB_API'),
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: { api_key: configService.get<string>('TMDB_API_KEY') },
        timeout: 5000,
        maxRedirects: 5,
      }),
      inject: [ConfigService]
    })],
  controllers: [TvController, MoviesController],
  providers: [
    MoviesService,
    TvService,
    makeCounterProvider({
      name: "tv_metric",
      help: "Counts the most frequest tv shows type searched",
      labelNames: ["type"]
    }),
    makeCounterProvider({
      name: "movies_metric",
      help: "Counts the most frequest movies shows type searched",
      labelNames: ["type"]
    }),
    makeCounterProvider({
      name: "requests_metric",
      help: "Counts number of processed requests",
      labelNames: ["requests_count", "http_route"]
    })
  ]
})
export class ShowsModule { }
