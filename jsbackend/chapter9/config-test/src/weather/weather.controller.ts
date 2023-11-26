import {Controller, Get} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Controller('weather')
export class WeatherController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    public getWeather(): string {
        // 환경변수값 읽기
        const apiUri = this.configService.get('WEATHER_API_URL');
        const apiKey = this.configService.get('WEATHER_API_KEY');
        return this.callWeatherApi(apiUri, apiKey);
    }

    private callWeatherApi(apiUri: string, apiKey: string): string {
        console.log('날씨 정보 가져오기');
        console.log(`apiUri: ${apiUri} / apiKey: ${apiKey}`);
        return '내일은 맑음';
    }
}
