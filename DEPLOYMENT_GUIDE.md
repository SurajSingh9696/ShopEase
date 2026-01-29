# Quick Deployment Guide - Authentication Fix

## What Changed?
Converted from **cookie-based** to **token-based (localStorage)** authentication to fix mobile login issues.

## Deployment Steps

### Backend Deployment (Render/Heroku/etc.)

1. **Push changes to repository:**
   ```bash
   git add .
   git commit -m "Fix: Convert to token-based auth for mobile compatibility"
   git push origin main
   ```

2. **Verify environment variables are still set:**
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `MONGODB_URI`
   - Other required env vars

3. **Deploy backend** (auto-deploy should trigger)

4. **Test backend endpoints:**
   ```bash
   # Test login
   curl -X POST https://your-backend.onrender.com/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"yourpassword"}'
   
   # Should return: { success: true, accessToken: "...", refreshToken: "...", user: {...} }
   ```

### Frontend Deployment (Render/Vercel/Netlify/etc.)

1. **Verify axios.js has correct backend URL:**
   ```javascript
   const API_BASE_URL = 'https://shopease-backend-02.onrender.com';
   ```

2. **Push changes to repository:**
   ```bash
   git add .
   git commit -m "Fix: Update frontend to use token-based auth"
   git push origin main
   ```

3. **Deploy frontend** (auto-deploy should trigger)

## Post-Deployment Testing

### Desktop Testing
1. Open in Chrome/Firefox/Safari
2. Login with valid credentials
3. Verify dashboard loads
4. Check localStorage has tokens:
   - Open DevTools → Application → Local Storage
   - Should see: `accessToken`, `refreshToken`, `user`
5. Refresh page - should stay logged in
6. Logout - should clear localStorage and redirect

### Mobile Testing
1. Open on mobile browser (Safari/Chrome)
2. Login with valid credentials
3. **Should now stay logged in!** ✅
4. Navigate to different pages
5. Close browser and reopen
6. Should still be logged in (within token expiry)

## Troubleshooting

### Issue: "Access token is missing" error
**Fix:** Check that frontend is sending `Authorization: Bearer <token>` header
```javascript
// Check in browser DevTools → Network → Headers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Issue: Login works but immediately logged out
**Fix:** Check browser console for errors. Verify localStorage is being set:
```javascript
// In browser console:
localStorage.getItem('accessToken')  // Should return token
localStorage.getItem('user')         // Should return user JSON
```

### Issue: CORS error on mobile
**Fix:** Verify backend CORS allows the frontend origin:
```javascript
// In server.js
const allowedOrigins = [
    'https://shopease-the-ecomm-site.onrender.com',
];
```

### Issue: Token refresh not working
**Fix:** Check refresh endpoint accepts Authorization header:
```javascript
// Should work:
POST /auth/refresh
Authorization: Bearer <refreshToken>
```

## Expected Behavior

### ✅ Desktop (Chrome/Firefox/Safari)
- Login works ✓
- Stays logged in ✓
- Token auto-refreshes ✓
- Logout works ✓

### ✅ Mobile (iOS Safari/Android Chrome)
- Login works ✓
- **NOW STAYS LOGGED IN** ✓
- Token auto-refreshes ✓
- Logout works ✓

## Rollback Plan (If Needed)

If something goes wrong, you can rollback:

```bash
# View commit history
git log --oneline

# Rollback to previous commit
git revert HEAD
git push origin main
```

Or restore from the previous deployment in your hosting dashboard.

## Notes

- **Users will need to re-login** after deployment (old cookies incompatible)
- No database migrations needed
- All API endpoints remain the same
- Mobile login issue should be completely resolved ✅

## Support

If issues persist after deployment:
1. Check backend logs for auth errors
2. Check browser console for frontend errors
3. Verify localStorage is accessible (not blocked by browser)
4. Test with different mobile browsers
5. Clear browser cache and localStorage, then retry
