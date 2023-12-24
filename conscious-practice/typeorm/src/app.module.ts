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
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
