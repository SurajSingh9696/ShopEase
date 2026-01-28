const dotenv = require('dotenv');
dotenv.config();

// Backend is always deployed on HTTPS, so always use secure settings
const accessCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 15 * 60 * 1000, // 15 minutes
}

const refreshCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

module.exports = {
    accessCookieOptions,
    refreshCookieOptions
}
