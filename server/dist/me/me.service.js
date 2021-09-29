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
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const response_type_1 = require("../common/response-type");
const axios_1 = require("axios");
const bookmark_entity_1 = require("../entities/bookmark.entity");
let MeService = class MeService {
    constructor(usersRepository, bookmarkRepository) {
        this.usersRepository = usersRepository;
        this.bookmarkRepository = bookmarkRepository;
    }
    async signUp(createUserDto) {
        console.log(createUserDto);
        const { email, password, nickname } = createUserDto;
        const newUser = this.usersRepository.create({
            email,
            password,
            nickname,
        });
        try {
            await this.usersRepository.save(newUser);
            return {
                data: null,
                statusCode: 201,
                message: `회원가입이 완료되었습니다.`,
            };
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException('이미 회원가입이 되어있습니다.');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async getMyInfo(user) {
        const followees = user.followees.length;
        const followers = user.followers.length;
        delete user.followees;
        delete user.followers;
        return {
            data: Object.assign(Object.assign({}, user), { followees, followers }),
            statusCode: 200,
            message: `내 정보 조회에 성공하였습니다.`,
        };
    }
    async updateMyAccount(user, updateUserDto) {
        const { password, nickname, profile } = updateUserDto;
        try {
            await this.usersRepository.update(user.id, updateUserDto);
            const newUser = await this.usersRepository.findOne({ id: user.id });
            delete newUser.password;
            delete newUser.refreshToken;
            return {
                data: Object.assign({}, newUser),
                statusCode: 200,
                message: `내 정보 수정에 성공하였습니다.`,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('내 정보 수정에 실패하였습니다.');
        }
    }
    async deleteMyAccount(user, accessToken, tokenType) {
        if (tokenType === 'jwt') {
            await this.usersRepository.update(user.id, { refreshToken: null });
            await this.usersRepository.softDelete({ id: user.id });
            return {
                data: null,
                statusCode: 200,
                message: `회원탈퇴가 완료되었습니다.`,
            };
        }
        else if (tokenType === 'kakao') {
            await axios_1.default.post('https://kapi.kakao.com/v1/user/unlink', {}, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: accessToken,
                },
                withCredentials: true,
            });
            await this.usersRepository.update(user.id, { refreshToken: null });
            await this.usersRepository.softDelete({ id: user.id });
            return {
                data: null,
                statusCode: 200,
                message: '회원탈퇴가 완료되었습니다.',
            };
        }
        else if (tokenType === 'naver') {
            const formUrlEncoded = (data) => {
                return Object.keys(data).reduce((acc, curr) => {
                    return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
                }, '');
            };
            await axios_1.default.post('https://nid.naver.com/oauth2.0/token', formUrlEncoded({
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
            await this.usersRepository.update(user.id, { refreshToken: null });
            await this.usersRepository.softDelete({ id: user.id });
            return {
                data: null,
                statusCode: 200,
                message: '회원탈퇴가 완료되었습니다.',
            };
        }
    }
    async restoreMyAccount(email) {
        try {
            await this.usersRepository.findOne({ email });
            await this.usersRepository.restore({ email });
            return {
                data: null,
                statusCode: 200,
                message: '계정복구가 완료되었습니다.',
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('계정복구에 실패하였습니다.');
        }
    }
    async checkMyInfo(user, password) {
        try {
            const userInfo = await this.usersRepository.findOne({
                id: user.id,
                password,
            });
            if (userInfo) {
                return {
                    data: null,
                    statusCode: 200,
                    message: '회원정보 수정 권한이 확인되었습니다.',
                };
            }
            else {
                throw new common_1.BadRequestException('회원정보 수정 권한 확인에 실패하였습니다.');
            }
        }
        catch (err) {
            throw new common_1.BadRequestException();
        }
    }
    async addBookmark(recipeId, user) {
        const bookmark = await this.bookmarkRepository.create({
            userId: user.id,
            recipeId: +recipeId,
        });
        try {
            await this.bookmarkRepository.save(bookmark);
        }
        catch (e) {
            throw e;
        }
        return {
            data: {},
            statusCode: 201,
            message: '북마크가 추가되었습니다.',
        };
    }
    async deleteBookamark(recipeId) {
        await this.bookmarkRepository.delete({ recipeId: +recipeId });
        return {
            data: {},
            statusCode: 201,
            message: '북마크가 삭제 되었습니다.',
        };
    }
};
MeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(bookmark_entity_1.Bookmark)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MeService);
exports.MeService = MeService;
//# sourceMappingURL=me.service.js.map