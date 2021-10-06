import { ResponseDto } from 'src/common/response.dto';
import { CommentsService } from './comments.service';
import { CreateCommentReqDto } from './dto/request-dto/create-comment.req.dto';
import { UpdateCommentReqDto } from './dto/request-dto/update-comment.req.dto';
import { DeleteCommentResDto } from './dto/response-dto/delete-comment.res.dto';
import { SeeCommentResDto } from './dto/response-dto/see-comment.res.dto';
import { UpdateCommentResDto } from './dto/response-dto/update-comment.res.dto';
import { CreateCommentReactionResDto } from './dto/response-dto/create-comment-reaction.res.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentReqDto: CreateCommentReqDto, recipeId: string, userId: number): Promise<ResponseDto>;
    findAll(recipeId: string): Promise<SeeCommentResDto>;
    update(commentId: string, updateCommentReqDto: UpdateCommentReqDto): Promise<UpdateCommentResDto>;
    delete(commentId: string): Promise<DeleteCommentResDto>;
    updateReaction(userId: number, commentId: string, reaction: string): Promise<CreateCommentReactionResDto>;
}
