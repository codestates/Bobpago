import { CreateUserReqDto } from './create-user.req.dto';
declare const UpdateUserReqDto_base: import("@nestjs/common").Type<Pick<CreateUserReqDto, "newPassword" | "nickname">>;
export declare class UpdateUserReqDto extends UpdateUserReqDto_base {
    readonly password: string;
    readonly nickname: string;
    readonly profile: string;
}
export {};
