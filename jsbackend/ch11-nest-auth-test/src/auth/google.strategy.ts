import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/', // 콜백 URL
      scope: ['email', 'profile'], // scope
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log(`Access Token: ${accessToken}, Refresh Token: ${refreshToken}`);

    const providerId = id;
    const email = emails[0].value;

    console.log(
      `Provider ID: ${providerId}, Email: ${email}, 성: ${name.familyName} / 이름: ${name.givenName}`,
    );
    return profile;
  }
}
