export class CreatePostDto {
  readonly author: string;
  readonly title: string;
  readonly content: string;
  readonly likeCount: number;
  readonly commentCount: number;
}
