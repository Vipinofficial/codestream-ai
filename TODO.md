# TODO: Fix Login with Role Support and Add Test Users

## Issues Found:
1. File-based auth doesn't return JWT tokens needed by frontend
2. No JWT middleware for route protection
3. No test users in the JSON database

## Tasks:
- [x] 1. Analyze codebase and understand auth flow
- [x] 2. Update backend/src/routes/auth.js to return JWT tokens
- [x] 3. Add JWT authentication middleware (/me endpoint)
- [x] 4. Create seed script for test users (admin, recruiter, candidate)
- [x] 5. Update frontend to store and send JWT tokens
- [x] 6. Add session persistence on page refresh

## Test Users Created:
| Email | Password | Role |
|-------|----------|------|
| admin@test.com | password123 | admin |
| recruiter@test.com | password123 | recruiter |
| candidate@test.com | password123 | candidate |

## ✅ COMPLETED:
- Updated `backend/src/routes/auth.js` to return JWT tokens on login/register
- Added `/me` endpoint for getting current user from token
- Created `seedTestUsers.js` script to add test users to db.json (hashed passwords)
- Updated `frontend/App.tsx` to store JWT token in localStorage
- Updated `frontend/services/api.ts` to include Authorization header in requests
- Added session persistence - app checks for existing token on load and restores session
- Login now properly authenticates and returns user role with session persistence

## How to Test:
1. Start backend: `cd backend && node app.js`
2. Start frontend: `cd frontend && npm run dev`
3. Login with any test account:
   - admin@test.com / password123 (redirects to System Settings)
   - recruiter@test.com / password123 (redirects to Recruiter Dashboard)
   - candidate@test.com / password123 (redirects to Dashboard)
4. **Refresh the page** - session should persist (user stays logged in)

## Database Format:
Users are stored in `backend/db.json` with bcrypt-hashed passwords:
```json
{
  "users": [
    {
      "id": "...",
      "name": "Admin User",
      "email": "admin@test.com",
      "password": "$2b$10$...",  // bcrypt hashed
      "role": "admin",
      "created_at": "..."
    }
  ]
}
```

## Authentication Flow:
1. User enters email/password → Backend verifies against db.json
2. On success → Backend generates JWT token and returns it
3. Frontend stores token in localStorage
4. On page refresh → Frontend calls /api/auth/me with token to restore session
5. Token includes user role → Frontend redirects to appropriate view

