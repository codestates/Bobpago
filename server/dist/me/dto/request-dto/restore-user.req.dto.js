"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreUserReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_req_dto_1 = require("./create-user.req.dto");
class RestoreUserReqDto extends (0, swagger_1.PickType)(create_user_req_dto_1.CreateUserReqDto, [
    'email',
]) {
}
exports.RestoreUserReqDto = RestoreUserReqDto;
//# sourceMappingURL=restore-user.req.dto.js.map