import { Common } from 'src/common/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow extends Common {
  @Column()
  followerId: number;

  @Column()
  followeeId: number;

  @ManyToOne(() => User, (user) => user.followers, { lazy: true })
  follower: User;

  @ManyToOne(() => User, (user) => user.followees, { lazy: true })
  followee: User;
}
