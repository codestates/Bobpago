import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CheckAuthDto } from './dto/check-auth.dto';
import { ResType } from 'src/common/response-type';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signIn(checkAuthDto: CheckAuthDto): Promise<ResType>;
    signOut(user: User, tokenType: string, accessToken: string): Promise<ResType>;
    newGenerateToken(userId: string, tokenType: string): Promise<ResType>;
    kakaoSignIn(code: string): Promise<ResType>;
    naverSignIn(code: string, state: string): Promise<ResType>;
    googleSignIn(code: string, scope: string): Promise<any>;
}
