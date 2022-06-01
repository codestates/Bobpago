"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSignInReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_req_dto_1 = require("../../../me/dto/request-dto/create-user.req.dto");
class CheckSignInReqDto extends (0, swagger_1.PickType)(create_user_req_dto_1.CreateUserReqDto, [
    'email',
    'password',
]) {
}
exports.CheckSignInReqDto = CheckSignInReqDto;
//# sourceMappingURL=check-signin.req.dto.js.map