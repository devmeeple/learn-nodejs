/**
 * 개발 환경/배포
 * ENV_PROTOCOL_KEY = 서버 프로토콜(http / https)
 * ENV_HOST_KEY = 서버주소
 *
 * JWT 인증
 * ENV_JWT_SECRET_KEY = 토큰에 들어가는 정보
 * ENV_HASH_ROUND_KEY = SALT 값
 *
 * 데이터베이스 정보
 * ENV_DB_HOST_KEY
 * ENV_DB_PORT_KEY
 * ENV_DB_USERNAME_KEY
 * ENV_DB_PASSWORD_KEY
 * ENV_DB_DATABASE_KEY
 */

export const ENV_PROTOCOL_KEY = 'PROTOCOL';
export const ENV_HOST_KEY = 'HOST';

export const ENV_JWT_SECRET_KEY = 'JWT_SECRET';
export const ENV_HASH_ROUND_KEY = 'HASH_ROUND';

export const ENV_DB_HOST_KEY = 'DB_HOST';
export const ENV_DB_PORT_KEY = 'DB_PORT';
export const ENV_DB_USERNAME_KEY = 'DB_USERNAME';
export const ENV_DB_PASSWORD_KEY = 'DB_PASSWORD';
export const ENV_DB_DATABASE_KEY = 'DB_DATABASE';
