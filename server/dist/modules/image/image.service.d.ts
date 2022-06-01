/// <reference types="multer" />
import { Repository } from 'typeorm';
import { RecipeImage } from '../../entities/recipe-image.entity';
import { Recipe } from '../../entities/recipe.entity';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../entities/user.entity';
import { UploadImageResDto } from './dto/upload-image.res.dto';
import { UpdateImageResDto } from './dto/update-image.res.dto';
export declare class ImageService {
    private recipeImageRepository;
    private recipeRepository;
    private commentRepository;
    private userRepository;
    constructor(recipeImageRepository: Repository<RecipeImage>, recipeRepository: Repository<Recipe>, commentRepository: Repository<Comment>, userRepository: Repository<User>);
    upload(files: any, id: number, path: string): Promise<UploadImageResDto>;
    uploadS3(file: any, bucket: any, filename: any, urls: any, id: any, path: any): Promise<unknown>;
    uploadImageUrl(id: any, urls: any, path: any): Promise<void>;
    update(files: Express.Multer.File, id: number, path: string): Promise<UpdateImageResDto>;
    deleteById(id: number, path: string): Promise<void>;
    deleteComments(recipeId: number): Promise<void>;
}
