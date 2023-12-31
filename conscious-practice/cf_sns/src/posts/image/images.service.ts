import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../../common/entities/image.entity';
import { QueryRunner, Repository } from 'typeorm';
import { basename, join } from 'path';
import {
  POST_IMAGE_PATH,
  TEMP_FOLDER_PATH,
} from '../../common/const/path.const';
import { promises } from 'fs';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class PostImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<ImageEntity>(ImageEntity)
      : this.imageRepository;
  }

  async createPostImage(createImageDto: CreateImageDto, qr?: QueryRunner) {
    const repository = this.getRepository(qr);
    const tempFilePath = join(TEMP_FOLDER_PATH, createImageDto.path);

    try {
      // 파일 존재여부 확인 존재하지 않으면 에러 반환
      await promises.access(tempFilePath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 파일 입니다');
    }

    // 파일 이름만 가져오기
    const filename = basename(tempFilePath);
    const newPath = join(POST_IMAGE_PATH, filename);

    const result = await repository.save({
      ...createImageDto,
    });
    // 파일 옮기기
    await promises.rename(tempFilePath, newPath);

    return result;
  }
}
