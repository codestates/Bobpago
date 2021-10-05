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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const response_dto_1 = require("../common/response.dto");
const axios_1 = require("axios");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signIn(checkSignInDto) {
        const { email, password } = checkSignInDto;
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            const payload = { email };
            const refreshToken = await this.jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
            });
            await this.usersRepository.update(user.id, { refreshToken });
            const newUser = await this.usersRepository.findOne({ email });
            delete newUser.refreshToken;
            delete newUser.password;
            delete newUser.recipes;
            delete newUser.bookmarks;
            delete newUser.recipeReactions;
            delete newUser.followees;
            delete newUser.followers;
            const accessToken = await this.jwtService.sign(payload);
            return {
                data: Object.assign({ tokenType: 'jwt', accessToken }, newUser),
                statusCode: 200,
                message: '로그인에 성공하였습니다.',
            };
        }
        else {
            throw new common_1.NotFoundException('로그인에 실패하였습니다.');
        }
    }
    async signOut(user, tokenType, accessToken) {
        switch (tokenType) {
            case 'jwt':
                await this.usersRepository.update(user.id, { refreshToken: null });
                return {
                    data: null,
                    statusCode: 200,
                    message: '로그아웃에 성공하였습니다.',
                };
            case 'kakao':
                await axios_1.default.post('https://kapi.kakao.com/v1/user/logout', {}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: accessToken,
                    },
                    withCredentials: true,
                });
                await this.usersRepository.update(user.id, { refreshToken: null });
                return {
                    data: null,
                    statusCode: 200,
                    message: '로그아웃에 성공하였습니다.',
                };
            case 'google':
            case 'naver':
                await this.usersRepository.update(user.id, { refreshToken: null });
                return {
                    data: null,
                    statusCode: 200,
                    message: '로그아웃에 성공하였습니다.',
                };
            default:
                throw new common_1.BadRequestException();
        }
    }
    async newGenerateToken(userId, tokenType) {
        if (tokenType === 'jwt') {
            const user = await this.usersRepository.findOne({
                id: +userId,
            });
            try {
                const result = await this.jwtService.verify(user.refreshToken, {
                    secret: process.env.REFRESH_TOKEN_SECRET,
                });
                const accessToken = this.jwtService.sign({ email: result.email });
                return {
                    data: {
                        tokenType: 'jwt',
                        accessToken,
                    },
                    statusCode: 200,
                    message: '새로운 토큰이 발급되었습니다.',
                };
            }
            catch (err) {
                throw new common_1.UnauthorizedException('토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요');
            }
        }
        else if (tokenType === 'kakao') {
            const user = await this.usersRepository.findOne({
                id: +userId,
            });
            const formUrlEncoded = (data) => {
                return Object.keys(data).reduce((acc, curr) => {
                    return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
                }, '');
            };
            try {
                const result = await axios_1.default.post('https://kauth.kakao.com/oauth/token', formUrlEncoded({
                    grant_type: 'refresh_token',
                    client_id: process.env.KAKAO_CLIENT_ID,
                    client_secret: process.env.KAKAO_CLIENT_SECRET,
                    refresh_token: user.refreshToken,
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true,
                });
                return {
                    data: {
                        tokenType: 'kakao',
                        accessToken: result.data.access_token,
                    },
                    statusCode: 200,
                    message: '새로운 토큰이 발급되었습니다.',
                };
            }
            catch (err) {
                throw new common_1.UnauthorizedException('토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요');
            }
        }
        else if (tokenType === 'naver') {
            const user = await this.usersRepository.findOne({
                id: +userId,
            });
            const formUrlEncoded = (data) => {
                return Object.keys(data).reduce((acc, curr) => {
                    return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
                }, '');
            };
            try {
                const result = await axios_1.default.post('https://nid.naver.com/oauth2.0/token', formUrlEncoded({
                    grant_type: 'refresh_token',
                    client_id: process.env.NAVER_CLIENT_ID,
                    client_secret: process.env.NAVER_CLIENT_SECRET,
                    refresh_token: user.refreshToken,
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true,
                });
                return {
                    data: {
                        tokenType: 'naver',
                        accessToken: result.data.access_token,
                    },
                    statusCode: 200,
                    message: '새로운 토큰이 발급되었습니다.',
                };
            }
            catch (err) {
                throw new common_1.UnauthorizedException('토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요');
            }
        }
        else if (tokenType === 'google') {
            const user = await this.usersRepository.findOne({
                id: +userId,
            });
            const formUrlEncoded = (data) => {
                return Object.keys(data).reduce((acc, curr) => {
                    return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
                }, '');
            };
            try {
                const result = await axios_1.default.post('https://accounts.google.com/o/oauth2/token', formUrlEncoded({
                    grant_type: 'refresh_token',
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    refresh_token: user.refreshToken,
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true,
                });
                return {
                    data: {
                        tokenType: 'google',
                        accessToken: result.data.access_token,
                    },
                    statusCode: 200,
                    message: '새로운 토큰이 발급되었습니다.',
                };
            }
            catch (err) {
                throw new common_1.UnauthorizedException('토큰의 유효기간이 만료되었습니다. 다시 로그인해주세요');
            }
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async kakaoSignIn(code) {
        const formUrlEncoded = (data) => {
            return Object.keys(data).reduce((acc, curr) => {
                return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
            }, '');
        };
        const tokenData = await axios_1.default.post('https://kauth.kakao.com/oauth/token', formUrlEncoded({
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_CLIENT_ID,
            client_secret: process.env.KAKAO_CLIENT_SECRET,
            redirect_uri: `${process.env.REDIRECT_URI}/kakao`,
            code,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
        const accessToken = tokenData.data.access_token;
        const refreshToken = tokenData.data.refresh_token;
        const userData = await axios_1.default.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        const email = userData.data.kakao_account.email;
        const nickname = userData.data.properties.nickname;
        try {
            const user = await this.usersRepository.findOne({ email });
            await this.usersRepository.update(user.id, { refreshToken });
            delete user.password;
            delete user.refreshToken;
            delete user.recipes;
            delete user.bookmarks;
            delete user.followees;
            delete user.followers;
            return {
                data: Object.assign({ tokenType: 'kakao', accessToken }, user),
                statusCode: 200,
                message: '카카오 소셜 로그인이 완료되었습니다.',
            };
        }
        catch (err) {
            const userInfo = await this.usersRepository.create({
                email,
                nickname,
                refreshToken,
            });
            await this.usersRepository.save(userInfo);
            const newUser = await this.usersRepository.findOne({ email });
            delete newUser.password;
            delete newUser.refreshToken;
            delete newUser.recipes;
            delete newUser.bookmarks;
            delete newUser.followees;
            delete newUser.followers;
            return {
                data: Object.assign({ tokenType: 'kakao', accessToken }, newUser),
                statusCode: 200,
                message: '카카오 소셜 회원가입 및 로그인이 완료되었습니다.',
            };
        }
    }
    async naverSignIn(code, state) {
        const formUrlEncoded = (data) => {
            return Object.keys(data).reduce((acc, curr) => {
                return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
            }, '');
        };
        const tokenData = await axios_1.default.post('https://nid.naver.com/oauth2.0/token', formUrlEncoded({
            grant_type: 'authorization_code',
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            code,
            state,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
        const accessToken = tokenData.data.access_token;
        const refreshToken = tokenData.data.refresh_token;
        const userData = await axios_1.default.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        const email = userData.data.response.email;
        const nickname = userData.data.response.nickname;
        try {
            const user = await this.usersRepository.findOne({ email });
            await this.usersRepository.update(user.id, { refreshToken });
            delete user.password;
            delete user.refreshToken;
            delete user.recipes;
            delete user.bookmarks;
            delete user.followees;
            delete user.followers;
            return {
                data: Object.assign({ tokenType: 'naver', accessToken }, user),
                statusCode: 200,
                message: '네이버 소셜 로그인이 완료되었습니다.',
            };
        }
        catch (err) {
            const userInfo = await this.usersRepository.create({
                email,
                nickname,
                refreshToken,
            });
            await this.usersRepository.save(userInfo);
            const newUser = await this.usersRepository.findOne({ email });
            delete newUser.password;
            delete newUser.refreshToken;
            delete newUser.recipes;
            delete newUser.bookmarks;
            delete newUser.followees;
            delete newUser.followers;
            return {
                data: Object.assign({ tokenType: 'naver', accessToken }, newUser),
                statusCode: 200,
                message: '네이버 소셜 회원가입 및 로그인이 완료되었습니다.',
            };
        }
    }
    async googleSignIn(code, scope) {
        const formUrlEncoded = (data) => {
            return Object.keys(data).reduce((acc, curr) => {
                return acc + `&${curr}=${encodeURIComponent(data[curr])}`;
            }, '');
        };
        const tokenData = await axios_1.default.post('https://oauth2.googleapis.com/token', formUrlEncoded({
            grant_type: 'authorization_code',
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.REDIRECT_URI}/google`,
            code,
            scope,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
        const { access_token, refresh_token, id_token } = tokenData.data;
        const data = await axios_1.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
        const { name, email } = data.data;
        try {
            const user = await this.usersRepository.findOne({ email });
            await this.usersRepository.update(user.id, {
                refreshToken: refresh_token,
            });
            delete user.password;
            delete user.refreshToken;
            delete user.recipes;
            delete user.bookmarks;
            delete user.followees;
            delete user.followers;
            return {
                data: Object.assign({ tokenType: 'google', accessToken: access_token }, user),
                statusCode: 200,
                message: '구글 소셜 로그인이 완료되었습니다.',
            };
        }
        catch (err) {
            const userData = await this.usersRepository.create({
                email,
                nickname: name,
                refreshToken: refresh_token,
            });
            await this.usersRepository.save(userData);
            const newUser = await this.usersRepository.findOne({ email });
            delete newUser.password;
            delete newUser.refreshToken;
            delete newUser.recipes;
            delete newUser.bookmarks;
            delete newUser.followees;
            delete newUser.followers;
            return {
                data: Object.assign({ tokenType: 'google', accessToken: access_token }, newUser),
                statusCode: 200,
                message: '구글 회원가입 및 소셜 로그인이 완료되었습니다.',
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map