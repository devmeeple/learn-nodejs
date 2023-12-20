import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/moive.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    // 임시 데이터베이스(배열)에서 find 메소드를 사용해서 조회
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`${id}번 영화를 찾을 수 없습니다.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    // id와 다른 것들만 배열에 두기
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieInfo: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieInfo,
    });
  }

  update(id: number, updateInfo: UpdateMovieDto) {
    // 이전에 배열에 있던 데이터를 movie에 담고 새로운 데이터를 추가함
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateInfo });
  }
}
