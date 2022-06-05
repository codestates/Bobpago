import { CommentsService } from './comments.service';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { CommentReactionResDto } from './dto/response-dto/comment-reaction.res.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { CommentAndRecipeIdPathReqDto } from './dto/request-dto/comment-recipe-id-path.req.dto';
import { RecipeIdPathReqDto } from '../recipes/dto/request-dto/recipe-id-path.req.dto';
import { CommentReactionReqDto } from './dto/request-dto/comment-reaction.req.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateCommentResDto } from './dto/response-dto/create-comment-res.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(body: CreateCommentReqDto, user: UserDto): Promise<CreateCommentResDto>;
    findAll(pathParam: RecipeIdPathReqDto): Promise<SeeCommentResDto>;
    update(pathParam: CommentAndRecipeIdPathReqDto, body: UpdateCommentReqDto): Promise<ResponseDto>;
    delete(pathParam: CommentAndRecipeIdPathReqDto): Promise<ResponseDto>;
    updateReaction(user: UserDto, pathParam: CommentAndRecipeIdPathReqDto, body: CommentReactionReqDto): Promise<CommentReactionResDto>;
}
