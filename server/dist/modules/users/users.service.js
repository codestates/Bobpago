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
const response_dto_1 = require("../../common/dto/response.dto");
const user_dto_1 = require("../../common/dto/user.dto");
const utils_1 = require("../../common/utils");
const follow_entity_1 = require("../../entities/follow.entity");
const recipe_entity_1 = require("../../entities/recipe.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const get_userinfo_dto_1 = require("./dto/get-userinfo.dto");
let UsersService = class UsersService {
    constructor(usersRepository, followRepository, recipeRepository) {
        this.usersRepository = usersRepository;
        this.followRepository = followRepository;
        this.recipeRepository = recipeRepository;
    }
    async getUserInfo(userId) {
        try {
            const user = await this.usersRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.recipes', 'recipes')
                .leftJoinAndSelect('user.followees', 'followees')
                .leftJoinAndSelect('user.followers', 'followers')
                .where('user.id = :id', { id: userId })
                .getOne();
            if (!user)
                throw 404;
            const result = new get_userinfo_dto_1.GetUserInfoDto(user);
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
    async getFollowers(followeeId) {
        try {
            const followers = await this.followRepository.find({
                where: { followeeId },
                relations: ['follower'],
                select: ['follower'],
            });
            if (!followers.length)
                throw 404;
            const result = followers.map((el) => {
                return new user_dto_1.UserDto(el.__follower__);
            });
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
    async getFollowees(followerId) {
        try {
            const followees = await this.followRepository.find({
                where: { followerId },
                relations: ['followee'],
                select: ['followee'],
            });
            if (!followees.length)
                throw 404;
            const result = followees.map((el) => {
                return new user_dto_1.UserDto(el.__followee__);
            });
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
    async followUser(followerId, followeeId) {
        try {
            if (followerId === followeeId)
                throw 409;
            const follow = this.followRepository.create({
                followerId,
                followeeId,
            });
            await this.followRepository.save(follow);
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
    async unFollowUser(followerId, followeeId) {
        try {
            if (followerId === followeeId)
                throw 409;
            const unFollow = await this.followRepository.findOne({
                followerId,
                followeeId,
            });
            if (!unFollow)
                throw 404;
            await this.followRepository.delete({
                followerId,
                followeeId,
            });
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