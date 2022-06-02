"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCheckerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const utils_1 = require("../common/utils");
const user_entity_1 = require("../entities/user.entity");
const user_dto_1 = require("../common/dto/user.dto");
const typeorm_2 = require("typeorm");
let AuthCheckerMiddleware = class AuthCheckerMiddleware {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const { tokenType } = req.query;
        const accessToken = req.headers.authorization.split(' ')[1];
        let result, email;
        try {
            switch (tokenType) {
                case 'jwt':
                    result = await this.jwtService.verify(accessToken, {
                        secret: process.env.ACCESS_TOKEN_SECRET,
                    });
                    email = result.email;
                    break;
                case 'kakao':
                    result = await axios_1.default.get('https://kapi.kakao.com/v2/user/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    });
                    const temp = result.data.kakao_account.email;
                    const decoratorIdx = temp.indexOf('@');
                    email = temp.slice(0, decoratorIdx + 1) + 'kakao.com';
                    break;
                case 'naver':
                    result = await axios_1.default.get('https://openapi.naver.com/v1/nid/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        withCredentials: true,
                    });
                    email = result.data.response.email;
                    break;
                case 'google':
                    result = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
                    email = result.data.email;
                    break;
                default:
                    throw 400;
            }
            const user = await this.usersRepository.findOne({ email });
            if (!user)
                throw 404;
            const userDto = new user_dto_1.UserDto(user);
            req.user = userDto;
            next();
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 401]();
        }
    }
};
AuthCheckerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthCheckerMiddleware);
exports.AuthCheckerMiddleware = AuthCheckerMiddleware;
//# sourceMappingURL=auth-checker.middleware.js.map