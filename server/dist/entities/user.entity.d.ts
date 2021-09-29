import { BaseEntity } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CommentReaction } from './comment-reaction.entity';
import { Comment } from './comment.entity';
import { Follow } from './follow.entity';
import { RecipeReaction } from './recipe-reaction.entity';
import { Recipe } from './recipe.entity';
export declare class User extends BaseEntity {
    id: number;
    email: string;
    password: string;
    nickname: string;
    profile: string;
    imageUrl: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    recipes: Recipe[];
    comments: Comment[];
    recipeReaction: RecipeReaction;
    commentReaction: CommentReaction;
    bookmarks: Bookmark[];
    followees: Follow[];
    followers: Follow[];
}
