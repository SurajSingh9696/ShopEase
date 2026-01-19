const dotenv = require('dotenv');
dotenv.config();
const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 2 * 60 * 1000 // 2 minutes
}

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

module.exports = {
    accessCookieOptions,
    refreshCookieOptions
}
