export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'agtdbld[,a\ORIT98qdmb;p@p',
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
};
