import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { CommentReaction } from '../../entities/comment-reaction.entity';
import { ImageService } from '../image/image.service';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { CommentReactionResDto } from './dto/response-dto/comment-reaction.res.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
export declare class CommentsService {
    private commentRepository;
    private commentReactionRepository;
    private readonly imageService;
    constructor(commentRepository: Repository<Comment>, commentReactionRepository: Repository<CommentReaction>, imageService: ImageService);
    create(content: string, recipeId: number, userId: number): Promise<GenerateResponseDto>;
    findAll(recipeId: number): Promise<SeeCommentResDto>;
    update(commentId: number, content: string): Promise<ResponseDto>;
    delete(commentId: number): Promise<ResponseDto>;
    updateReaction(userId: number, commentId: number): Promise<CommentReactionResDto>;
}
