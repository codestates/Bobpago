import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class UserInfoResDto extends User {
  @IsNotEmpty()
  tokenType: string;

  @IsString()
  accessToken: string;

  //   @Exclude()
  //   refreshToken: string;

  //   @Exclude()
  //   password: string;

  //   @Exclude()
  //   bookmarks: any;

  //   @Exclude()
  //   followees: any;

  //   @Exclude()
  //   followers: any;

  //   @Exclude()
  //   recipes: any;

  //   @Exclude()
  //   recipeReaction: any;
}
