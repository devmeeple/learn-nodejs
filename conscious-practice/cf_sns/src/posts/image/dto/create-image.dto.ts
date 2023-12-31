import { PickType } from '@nestjs/mapped-types';
import { ImageEntity } from '../../../common/entities/image.entity';

export class CreateImageDto extends PickType(ImageEntity, [
  'path',
  'post',
  'order',
  'type',
]) {}
