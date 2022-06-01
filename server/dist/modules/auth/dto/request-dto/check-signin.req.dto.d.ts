import { CreateUserReqDto } from 'src/modules/me/dto/request-dto/create-user.req.dto';
declare const CheckSignInReqDto_base: import("@nestjs/common").Type<Pick<CreateUserReqDto, "email" | "password">>;
export declare class CheckSignInReqDto extends CheckSignInReqDto_base {
}
export {};
