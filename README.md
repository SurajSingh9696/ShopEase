# E-commerce API (Backend)

Base URL: `http://localhost:3030`

Authentication:
- Login/Register set `accessToken` (short-lived) and `refreshToken` cookies.
- Protected routes require `accessToken` cookie.
- `adminOnly` endpoints also require `req.user.role === 'admin'`.

---

## Auth (`/auth`)
- **POST /auth/register** — Body: `{ name, age, email, password }` → `201 { success, message }` (sets cookies)
- **POST /auth/login** — Body: `{ email, password }` → `200 { success, message }` (sets cookies)
- **POST /auth/refresh** — Cookies: `refreshToken` → `200 { success, message }` (renews access token cookie)
- **POST /auth/logout** — Clears `accessToken` and `refreshToken` → `200 { success, message }`

## Password Reset (`/password-reset`)
- **POST /password-reset/request** — Body: `{ email }` → `200 { success, message }` (sends 6-digit code to email)
- **POST /password-reset/verify** — Body: `{ email, code }` → `200 { success, message }` (verifies the code)
- **POST /password-reset/reset** — Body: `{ email, code, newPassword }` → `200 { success, message }` (resets password and clears code)
  - Code expires in 15 minutes
  - Email must exist in the system
  - Code is deleted after successful password reset

## User (`/user`) – requires `accessToken`
- **GET /user/profile** → `200 { success, message, user }`
- **GET /user/me** → `200 { success, message, user }`
- **PUT /user/profile** — Body: any updatable user fields (e.g., `name`, `phone`, etc.) → `200 { success, message, user }`
- **POST /user/addresses** — Body: `{ line1, line2?, city, state, postalCode }` → `201 { success, message, address }`
- **GET /user/addresses** → `200 { success, message, addresses }`
- **PUT /user/addresses/:id** — Body: address fields to change → `200 { success, message, address }`
- **DELETE /user/addresses/:id** → `200 { success, message, address }`

## Categories (`/category`) – requires `accessToken`
- **GET /category** → `200 { success, message, data: categories }`
- **POST /category** (admin) — Body: `{ name, parent }` (parent is category name or omit) → `201 { success, message }`
- **PUT /category/:id** (admin) — Body: `{ name, parent }` → `200 { success, message }`
- **DELETE /category/:id** (admin) → `200 { success, message }`

## Products (`/product`) – requires `accessToken`
- **GET /product** → `200 { success, message, data: products }`
- **GET /product/:id** → `200 { success, message, data: product }`
- **POST /product** (admin) — Body: `{ title, description, price, category: [string], categoryId: [ObjectId], salePrice?, sku, brand, images: [string], stock }` → `201 { success, message }`
- **PUT /product/:id** (admin) — Body: any product fields to update → `200 { success, message, data: updatedProduct }`
- **DELETE /product/:id** (admin) → `200 { success, message }`

## Reviews (`/review`) – requires `accessToken`
- **POST /review/:productId** — Body: `{ rating (1-5), comment }` → `201 { success, message }`
- **GET /review/product/:productId** → `200 { success, message, data: reviews }`
- **DELETE /review/:id** (admin) → `200 { success, message }`

## Cart (`/cart`) – requires `accessToken`
- **GET /cart** → `200 { success, message, data: cart | { data: [] } }`
- **POST /cart/add** — Body: `{ productId, quantity }` → `200/201 { success, message }`
- **PUT /cart/update/:itemId** — Body: `{ quantity }` → `200 { success, message }`
- **DELETE /cart/remove/:itemId** → `200 { success, message }`
- **DELETE /cart/clear** → `200 { success, message }`

## Orders (`/order`) – requires `accessToken`
- **POST /order** — Body: `{ shippingAddress: { line1, line2?, city, state, postalCode } }` (uses items from user cart) → `201 { success, message, data: order }`
- **GET /order/:id** → `200 { success, data: order }`
- **GET /order/user/:userId** → `200 { success, data: orders }`
- **PUT /order/:id/status** (admin) — Body: `{ status: pending|processing|shipped|delivered|cancelled }` → `200 { success, message, data: order }`

## Payments (`/payment`) – requires `accessToken`
- **POST /payment** — Body: `{ orderId, amount, provider (stripe|paypal|razorpay|paytm|cash), transactionId }` → `201 { success, message }`
- **GET /payment/:id** → `200 { success, message, data: payment }`
- **GET /payment/user/:userId** → `200 { success, message, data: payments }`
- **POST /payment/:id/verify** → `200 { success, message, data: payment }`
- **PUT /payment/:id/status** (admin) — Body: `{ status: pending|completed|failed|refunded }`; if `completed`, order is updated to `processing` → `200 { success, message }`

## Admin (`/admin`) – requires `accessToken` + admin role
- **GET /admin/users** → `200 { success, message, data: users }`
- **GET /admin/orders** → `200 { success, message, data: orders }`
- **POST /admin/users/:id/block** — Body: `{ reason }` → `200 { success, message }`
- **POST /admin/users/:id/unblock** → `200 { success, message }`
- **PUT /admin/orders/:id/status** — Body: `{ status }` → `200 { success, message }`

Error responses:
- Validation/auth failures typically return `400` or `401` with `{ success: false, message }`.
- Missing/invalid auth for admin-only returns `403`.
- Not-found cases return `404` where implemented.
- Unhandled errors return `500 { success: false, message: 'Server Error', error? }`.