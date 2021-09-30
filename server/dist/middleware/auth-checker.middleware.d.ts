import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthCheckerMiddleware implements NestMiddleware {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
