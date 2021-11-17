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
const bcrypt = require("bcryptjs");
const axios_1 = require("axios");
const bookmark_entity_1 = require("../entities/bookmark.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
let MeService = class MeService {
    constructor(usersRepository, bookmarkRepository, recipeRepository) {
        this.usersRepository = usersRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.recipeRepository = recipeRepository;
    }
    async signUp(createUserDto) {
        const { email, newPassword, nickname } = createUserDto;
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(newPassword, salt);
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
        const newUser = await this.usersRepository.findOne({
            where: {
                email: user.email,
            },
            relations: ['followees', 'followers', 'bookmarks', 'recipes'],
        });
        const followees = newUser.followees.length;
        const followers = newUser.followers.length;
        const recipeIds = newUser.bookmarks.map((el) => {
            return { id: el.recipeId };
        });
        try {
            const bookmarks = recipeIds.length !== 0
                ? await this.recipeRepository.find({
                    where: recipeIds,
                })
                : [];
            bookmarks.reverse();
            newUser.recipes.reverse();
            delete newUser.password;
            delete newUser.refreshToken;
            return {
                data: Object.assign(Object.assign({}, newUser), { bookmarks, followees, followers }),
                statusCode: 200,
                message: `내 정보 조회에 성공하였습니다.`,
            };
        }
        catch (err) {
            throw new common_1.NotFoundException('내 정보 조회에 실패하였습니다.');
        }
    }
    async updateMyAccount(user, updateUserDto) {
        try {
            const salt = await bcrypt.genSalt();
            const { password } = updateUserDto;
            if (password) {
                updateUserDto.password = await bcrypt.hash(password, salt);
            }
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
            throw new common_1.NotFoundException('내 정보 수정에 실패하였습니다.');
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
        else if (tokenType === 'google') {
            await axios_1.default.post(`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`, {}, {
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
    }
    async restoreMyAccount(restoreUserDto) {
        try {
            await this.usersRepository.restore({ email: restoreUserDto.email });
            return {
                data: null,
                statusCode: 200,
                message: '계정복구가 완료되었습니다.',
            };
        }
        catch (err) {
            throw new common_1.NotFoundException('계정복구에 실패하였습니다.');
        }
    }
    async checkMyInfo(user, checkInfoUserDto) {
        const { email } = user;
        const { newPassword } = checkInfoUserDto;
        try {
            const oldUser = await this.usersRepository.findOne({
                email,
                password: newPassword,
            });
            const newUser = await this.usersRepository.findOne({ email });
            const checkPassword = await bcrypt.compare(newPassword, newUser.password);
            if (checkPassword || oldUser) {
                return {
                    data: null,
                    statusCode: 200,
                    message: '회원정보 수정 권한이 확인되었습니다.',
                };
            }
            else {
                throw new common_1.NotFoundException('회원정보 수정 권한 확인에 실패하였습니다.');
            }
        }
        catch (err) {
            throw new common_1.NotFoundException('회원정보 수정 권한 확인에 실패하였습니다.');
        }
    }
    async addBookmark(recipeId, user) {
        const bookmark = await this.bookmarkRepository.findOne({
            userId: user.id,
            recipeId: +recipeId,
        });
        if (bookmark) {
            throw new common_1.ConflictException('이미 추가된 북마크입니다.');
        }
        else {
            try {
                await this.bookmarkRepository.save({
                    userId: user.id,
                    recipeId: +recipeId,
                });
                return {
                    data: null,
                    statusCode: 201,
                    message: '북마크가 추가되었습니다.',
                };
            }
            catch (err) {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async deleteBookamark(recipeId) {
        await this.bookmarkRepository.delete({ recipeId: +recipeId });
        return {
            data: null,
            statusCode: 200,
            message: '북마크가 삭제 되었습니다.',
        };
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