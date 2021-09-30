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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const response_type_1 = require("../common/response-type");
const follow_entity_1 = require("../entities/follow.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository, followRepository, recipeRepository) {
        this.usersRepository = usersRepository;
        this.followRepository = followRepository;
        this.recipeRepository = recipeRepository;
    }
    async getUserInfo(userId) {
        const user = await this.usersRepository.findOne({ id: +userId });
        const followees = user.followees.length;
        const followers = user.followers.length;
        delete user.bookmarks;
        delete user.password;
        delete user.refreshToken;
        delete user.followees;
        delete user.followers;
        if (user) {
            return {
                data: Object.assign(Object.assign({}, user), { followees,
                    followers }),
                statusCode: 200,
                message: '유저 정보 조회가 완료되었습니다.',
            };
        }
        else {
            throw new common_1.NotFoundException('존재하지 않는 유저입니다.');
        }
    }
    async getFollowers(userId) {
        const followeeId = +userId;
        const followers = await this.followRepository.find({
            relations: ['follower'],
            where: { followeeId },
        });
        const resultData = followers.map((el) => {
            delete el.follower.password;
            delete el.follower.refreshToken;
            delete el.follower.recipes;
            delete el.follower.followees;
            delete el.follower.followers;
            delete el.follower.bookmarks;
            return el.follower;
        });
        if (resultData.length) {
            return {
                data: resultData,
                statusCode: 200,
                message: '팔로워 조회가 완료되었습니다.',
            };
        }
        else {
            throw new common_1.NotFoundException('팔로워가 존재하지 않습니다.');
        }
    }
    async getFollowees(userId) {
        const followerId = +userId;
        const followees = await this.followRepository.find({
            relations: ['followee'],
            where: { followerId },
        });
        const resultData = followees.map((el) => {
            delete el.followee.password;
            delete el.followee.refreshToken;
            delete el.followee.recipes;
            delete el.followee.followees;
            delete el.followee.followers;
            delete el.followee.bookmarks;
            return el.followee;
        });
        if (resultData.length) {
            return {
                data: resultData,
                statusCode: 200,
                message: '팔로이 조회가 완료되었습니다.',
            };
        }
        else {
            throw new common_1.NotFoundException('팔로이가 존재하지 않습니다.');
        }
    }
    async followUser(follower, userId) {
        const followerId = +follower.id;
        const followeeId = +userId;
        if (followerId === followeeId) {
            throw new common_1.ConflictException('스스로를 팔로우 할 수 없습니다.');
        }
        const follow = this.followRepository.create({
            followerId,
            followeeId,
        });
        try {
            await this.followRepository.save(follow);
            return {
                data: null,
                statusCode: 200,
                message: '유저 팔로우에 성공하였습니다.',
            };
        }
        catch (err) {
            throw new common_1.NotFoundException('팔로우 유저가 존재하지 않습니다.');
        }
    }
    async unFollowUser(follower, userId) {
        const followerId = +follower.id;
        const followeeId = +userId;
        console.log(followerId);
        if (followerId === followeeId) {
            throw new common_1.ConflictException('스스로를 언팔로우 할 수 없습니다.');
        }
        const unFollow = await this.followRepository.findOne({
            followerId,
            followeeId,
        });
        if (unFollow) {
            await this.followRepository.delete({
                followerId,
                followeeId,
            });
            return {
                data: null,
                statusCode: 200,
                message: '유저 언팔로우에 성공하였습니다.',
            };
        }
        else {
            throw new common_1.NotFoundException('언팔로우 유저가 존재하지 않습니다.');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __param(2, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map