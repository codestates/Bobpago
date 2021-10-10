import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentReaction } from '../entities/comment-reaction.entity';
import { ImageService } from '../image/image.service';
import { CreateCommentResDto } from './dto/response-dto/create-comment.res.dto';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { UpdateCommentResDto } from './dto/response-dto/update-comment.res.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { DeleteCommentResDto } from './dto/response-dto/delete-comment.res.dto';
import { CreateCommentReactionResDto } from './dto/response-dto/create-comment-reaction.res.dto';
export declare class CommentsService {
    private commentRepository;
    private commentReactionRepository;
    private readonly imageService;
    constructor(commentRepository: Repository<Comment>, commentReactionRepository: Repository<CommentReaction>, imageService: ImageService);
    create(createCommentReqDto: CreateCommentReqDto, recipeId: number, userId: number): Promise<CreateCommentResDto>;
    findAll(recipeId: number): Promise<SeeCommentResDto>;
    update(commentId: number, updateCommentReqDto: UpdateCommentReqDto): Promise<UpdateCommentResDto>;
    delete(commentId: number): Promise<DeleteCommentResDto>;
    updateReaction(userId: number, commentId: number): Promise<CreateCommentReactionResDto>;
}
