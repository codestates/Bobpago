import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class Follow extends BaseEntity {
    id: number;
    followerId: number;
    followeeId: number;
    createdAt: Date;
    updatedAt: Date;
    follower: User;
    followee: User;
}
