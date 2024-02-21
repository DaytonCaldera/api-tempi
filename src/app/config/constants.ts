export const jwtConstants = {
  secret: 't3mp1.pr0',
};

export const AppConfig = {
  production: process.env.APP_PRODUCTION,
  tokenExpireTime: process.env.AUTH_EXP_TIME,
};
