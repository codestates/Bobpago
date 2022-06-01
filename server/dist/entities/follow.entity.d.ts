import { Common } from 'src/common/common.entity';
import { User } from './user.entity';
export declare class Follow extends Common {
    followerId: number;
    followeeId: number;
    follower: User;
    followee: User;
}
