import { ResType } from 'src/common/response-type';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CheckAuthDto } from './dto/check-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(checkAuthDto: CheckAuthDto): Promise<ResType>;
    signOut(user: User, tokenType: string, accessToken: string): Promise<ResType>;
    generateToken(userId: string, tokenType: string): Promise<ResType>;
    kakaoSignIn(code: string): Promise<ResType>;
    naverSignIn(code: string, state: string): Promise<ResType>;
    googleSignIn(code: string, scope: string): Promise<ResType>;
}
