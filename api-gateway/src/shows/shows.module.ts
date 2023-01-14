import { Module } from '@nestjs/common';
import { TvController } from './tv/tv.controller';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { TvService } from './tv/tv.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [ HttpModule ],
  controllers: [TvController, MoviesController],
  providers: [
    MoviesService,
    TvService,
    ConfigService,
    makeCounterProvider({
      name: "modules_metric",
      help: "Counts the requests by visited module",
      labelNames: ["module_name"]
    }),
    makeCounterProvider({
      name: "requests_metric",
      help: "Counts number of processed requests",
      labelNames: ["requests_count", "http_route"]
    })
  ]
})
export class ShowsModule { }
