"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInfoUserReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_req_dto_1 = require("./create-user.req.dto");
class CheckInfoUserReqDto extends (0, swagger_1.PickType)(create_user_req_dto_1.CreateUserReqDto, [
    'newPassword',
]) {
}
exports.CheckInfoUserReqDto = CheckInfoUserReqDto;
//# sourceMappingURL=checkInfo-user.req.dto.js.map