import { Common } from 'src/common/common.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class CommentReaction extends Common {
  @Column()
  userId: number;

  @Column()
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.commentReactions, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  comment: Comment;

  @ManyToOne(() => User, (user) => user.commentReactions, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  user: User;
}
