import {Injectable} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';
import {UserService} from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }

    async deserializeUser(
        payload: any,
        done: (err: Error, payload: any) => void,
    ): Promise<any> {
        const user = await this.userService.getUser(payload);
        if (!user) {
            done(new Error('No User'), null);
            return;
        }
        const { password, ...userInfo } = user;

        // 유저 정보가 있다면 유저 정보 반환
        done(null, userInfo);
    }

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user.email);
    }

}