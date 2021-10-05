import { Repository } from 'typeorm';
import { RecipeImage } from '../entities/recipe-image.entity';
import { Recipe } from '../entities/recipe.entity';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
import { UpdateImagesDto } from './dto/upload-image.dto';
import { UploadImagesDto } from './dto/update-image.dto';
export declare class ImageService {
    private recipeImageRepository;
    private recipeRepository;
    private commentRepository;
    private userRepository;
    constructor(recipeImageRepository: Repository<RecipeImage>, recipeRepository: Repository<Recipe>, commentRepository: Repository<Comment>, userRepository: Repository<User>);
    upload(files: any, id: any, path: any): Promise<UploadImagesDto>;
    uploadS3(file: any, bucket: any, filename: any, urls: any, id: any, path: any): Promise<unknown>;
    uploadImageUrl(id: any, urls: any, path: any): Promise<void>;
    update(files: any, id: any, path: any): Promise<UpdateImagesDto>;
    deleteById(id: number, path: string): Promise<void>;
    deleteComments(recipeId: number): Promise<void>;
}
