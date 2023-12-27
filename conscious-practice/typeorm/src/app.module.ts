import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { StudentEntity, TeacherEntity } from './entities/person.entity';
import {
  AirplaneEntity,
  BookEntity,
  CarEntity,
  ComputerEntity,
  SingleBaseEntity,
} from './entities/inheritance.entity';
import { ProfileEntity } from './entities/profile.entity';
import { PostEntity } from './entities/post.entity';
import { TagEntity } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'typeorm',
      password: 'typeorm',
      database: 'typeorm',
      entities: [
        UserEntity,
        StudentEntity,
        TeacherEntity,
        BookEntity,
        CarEntity,
        SingleBaseEntity,
        ComputerEntity,
        AirplaneEntity,
        ProfileEntity,
        PostEntity,
        TagEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      PostEntity,
      TagEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
