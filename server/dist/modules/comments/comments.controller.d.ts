import { CommentsService } from './comments.service';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { CommentReactionResDto } from './dto/response-dto/comment-reaction.res.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { CommentAndRecipeIdPathReqDto } from './dto/request-dto/comment-recipe-id-path.req.dto';
import { RecipeIdPathReqDto } from '../recipes/dto/request-dto/recipe-id-path.req.dto';
import { CommentReactionReqDto } from './dto/request-dto/comment-reaction.req.dto';
import { GenerateResponseDto, ResponseDto } from 'src/common/dto/response.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(body: CreateCommentReqDto, user: UserDto): Promise<GenerateResponseDto>;
    findAll(path: RecipeIdPathReqDto): Promise<SeeCommentResDto>;
    update(path: CommentAndRecipeIdPathReqDto, body: UpdateCommentReqDto): Promise<ResponseDto>;
    delete(path: CommentAndRecipeIdPathReqDto): Promise<ResponseDto>;
    updateReaction(user: UserDto, path: CommentAndRecipeIdPathReqDto, body: CommentReactionReqDto): Promise<CommentReactionResDto>;
}
