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
exports.MeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const axios_1 = require("axios");
const bookmark_entity_1 = require("../../entities/bookmark.entity");
const recipe_entity_1 = require("../../entities/recipe.entity");
const utils_1 = require("../../common/utils");
const user_dto_1 = require("../users/dto/user.dto");
const get_myinfo_dto_1 = require("./dto/get-myinfo.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let MeService = class MeService {
    constructor(usersRepository, bookmarkRepository, recipeRepository) {
        this.usersRepository = usersRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.recipeRepository = recipeRepository;
    }
    async signUp(params) {
        try {
            const { email, password, nickname } = params;
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = this.usersRepository.create({
                email,
                password: hashPassword,
                nickname,
            });
            await this.usersRepository.save(newUser);
            return {
                data: null,
                statusCode: 201,
                message: utils_1.statusMessage[201],
            };
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new utils_1.errorHandler[409]();
            }
            else {
                throw new utils_1.errorHandler[500]();
            }
        }
    }
    async getMyInfo(user) {
        try {
            const userInfo = await this.usersRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.followees', 'followees')
                .leftJoinAndSelect('user.followers', 'followers')
                .leftJoinAndSelect('user.bookmarks', 'bookmarks')
                .leftJoinAndSelect('user.recipes', 'recipes')
                .where('user.email = :email', { email: user.getEmail })
                .orderBy('bookmarks.id', 'DESC')
                .addOrderBy('recipes.id', 'DESC')
                .getOne();
            const result = new get_myinfo_dto_1.GetMyInfoDto(userInfo);
            return {
                data: result,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async updateMyAccount(user, params) {
        try {
            const result = await this.usersRepository.update(user.getId, params);
            if (!result.affected)
                throw 404;
            return {
                data: params,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async deleteMyAccount(user, accessToken, tokenType) {
        try {
            switch (tokenType) {
                case 'jwt':
                    break;
                case 'kakao':
                    await axios_1.default.post('https://kapi.kakao.com/v1/user/unlink', {}, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: accessToken,
                        },
                        withCredentials: true,
                    });
                    break;
                case 'naver':
                    await axios_1.default.post('https://nid.naver.com/oauth2.0/token', (0, utils_1.formUrlEncoded)({
                        grant_type: 'delete',
                        client_id: process.env.NAVER_CLIENT_ID,
                        client_secret: process.env.NAVER_CLIENT_SECRET,
                        access_token: accessToken.split(' ')[1],
                        service_provider: 'NAVER',
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        withCredentials: true,
                    });
                    break;
                case 'google':
                    await axios_1.default.post(`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`, {}, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: accessToken,
                        },
                        withCredentials: true,
                    });
                    break;
            }
            await this.usersRepository.softDelete({ id: user.getId });
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async restoreMyAccount(email) {
        try {
            const result = await this.usersRepository.restore({
                email,
            });
            if (!result.affected)
                throw 404;
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async checkMyInfo(email, password) {
        try {
            const user = await this.usersRepository.findOne({ email });
            const checkPassword = user.password === password
                ? true
                : await bcrypt.compare(password, user.password);
            if (!checkPassword || !user)
                throw 404;
            return {
                data: new user_dto_1.UserDto(user),
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async addBookmark(recipeId, userId) {
        try {
            const bookmark = await this.bookmarkRepository.findOne({
                userId,
                recipeId,
            });
            if (bookmark)
                throw 409;
            await this.bookmarkRepository.save({ userId, recipeId });
            return {
                data: null,
                statusCode: 201,
                message: utils_1.statusMessage[201],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async deleteBookamark(recipeId) {
        try {
            const result = await this.bookmarkRepository.delete({ recipeId });
            if (!result.affected)
                throw 404;
            return {
                data: null,
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
};
MeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(bookmark_entity_1.Bookmark)),
    __param(2, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MeService);
exports.MeService = MeService;
//# sourceMappingURL=me.service.js.map