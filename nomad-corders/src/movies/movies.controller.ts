import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/moive.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieInfo) {
    return this.movieService.create(movieInfo);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.movieService.deleteOne(movieId);
  }

  // 일부분만 업데이트: Patch
  // 전체 업데이트: Put
  @Patch(':id')
  update(@Param('id') movieId: string, @Body() updateInfo) {
    return this.movieService.update(movieId, updateInfo);
  }
}
