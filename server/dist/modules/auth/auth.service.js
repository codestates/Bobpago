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
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("axios");
const utils_1 = require("../../common/utils");
const user_dto_1 = require("../users/dto/user.dto");
const response_dto_1 = require("../../common/dto/response.dto");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signIn(checkSignInDto, res) {
        try {
            const { email, password } = checkSignInDto;
            const user = await this.usersRepository.findOne({ email });
            const checkPassword = user.password === password
                ? true
                : await bcrypt.compare(password, user.password);
            if (!checkPassword || !user)
                throw 404;
            const payload = { email };
            const refreshToken = await this.jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
            });
            res.cookie('refreshToken', refreshToken);
            const result = new user_dto_1.UserDto(user);
            const accessToken = await this.jwtService.sign(payload);
            return {
                data: Object.assign({ tokenType: 'jwt', accessToken }, result),
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 500]();
        }
    }
    async signOut(tokenType, accessToken, res) {
        try {
            if (tokenType === 'kakao') {
                await axios_1.default.post('https://kapi.kakao.com/v1/user/logout', {}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: accessToken,
                    },
                    withCredentials: true,
                });
            }
            res.clearCookie('refreshToken');
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
    async newGenerateToken(tokenType, req) {
        const refreshToken = req.cookies['refreshToken'];
        let result, accessToken;
        try {
            switch (tokenType) {
                case 'jwt':
                    result = await this.jwtService.verify(refreshToken, {
                        secret: process.env.REFRESH_TOKEN_SECRET,
                    });
                    accessToken = this.jwtService.sign({ email: result.email });
                    break;
                case 'kakao':
                    result = await axios_1.default.post('https://kauth.kakao.com/oauth/token', (0, utils_1.formUrlEncoded)({
                        grant_type: 'refresh_token',
                        client_id: process.env.KAKAO_CLIENT_ID,
                        client_secret: process.env.KAKAO_CLIENT_SECRET,
                        refresh_token: refreshToken,
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        withCredentials: true,
                    });
                    accessToken = result.data.access_token;
                    break;
                case 'naver':
                    result = await axios_1.default.post('https://nid.naver.com/oauth2.0/token', (0, utils_1.formUrlEncoded)({
                        grant_type: 'refresh_token',
                        client_id: process.env.NAVER_CLIENT_ID,
                        client_secret: process.env.NAVER_CLIENT_SECRET,
                        refresh_token: refreshToken,
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        withCredentials: true,
                    });
                    accessToken = result.data.access_token;
                    break;
                case 'goolge':
                    result = await axios_1.default.post('https://accounts.google.com/o/oauth2/token', (0, utils_1.formUrlEncoded)({
                        grant_type: 'refresh_token',
                        client_id: process.env.GOOGLE_CLIENT_ID,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET,
                        refresh_token: refreshToken,
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        withCredentials: true,
                    });
                    accessToken = result.data.access_token;
                    break;
            }
            return {
                data: {
                    tokenType,
                    accessToken,
                },
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 401]();
        }
    }
    async kakaoSignIn(code, res) {
        try {
            const tokenData = await axios_1.default.post('https://kauth.kakao.com/oauth/token', (0, utils_1.formUrlEncoded)({
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
            const temp = userData.data.kakao_account.email;
            const nickname = userData.data.properties.nickname;
            const decoratorIdx = temp.indexOf('@');
            const email = temp.slice(0, decoratorIdx + 1) + 'kakao.com';
            let resultUser;
            resultUser = await this.usersRepository.findOne({ email });
            if (!resultUser) {
                const userInfo = await this.usersRepository.create({
                    email,
                    nickname,
                });
                const newUser = await this.usersRepository.save(userInfo);
                resultUser = new user_dto_1.UserDto(newUser);
            }
            res.cookie('refreshToken', refreshToken);
            return {
                data: Object.assign({ tokenType: 'kakao', accessToken }, resultUser),
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 401]();
        }
    }
    async naverSignIn(code, state, res) {
        try {
            const tokenData = await axios_1.default.post('https://nid.naver.com/oauth2.0/token', (0, utils_1.formUrlEncoded)({
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
            let resultUser;
            resultUser = await this.usersRepository.findOne({ email });
            if (!resultUser) {
                const userInfo = await this.usersRepository.create({
                    email,
                    nickname,
                });
                const newUser = await this.usersRepository.save(userInfo);
                resultUser = new user_dto_1.UserDto(newUser);
            }
            res.cookie('refreshToken', refreshToken);
            return {
                data: Object.assign({ tokenType: 'naver', accessToken }, resultUser),
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 401]();
        }
    }
    async googleSignIn(code, scope, res) {
        try {
            const tokenData = await axios_1.default.post('https://oauth2.googleapis.com/token', (0, utils_1.formUrlEncoded)({
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
            let resultUser;
            resultUser = await this.usersRepository.findOne({ email });
            if (!resultUser) {
                const userInfo = await this.usersRepository.create({
                    email,
                    nickname: name,
                });
                const newUser = await this.usersRepository.save(userInfo);
                resultUser = new user_dto_1.UserDto(newUser);
            }
            res.cookie('refreshToken', refresh_token);
            return {
                data: Object.assign({ tokenType: 'google', accessToken: access_token }, resultUser),
                statusCode: 200,
                message: utils_1.statusMessage[200],
            };
        }
        catch (err) {
            throw new utils_1.errorHandler[utils_1.errorHandler[err] ? err : 401]();
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