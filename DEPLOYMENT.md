# 📋 Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend
- [x] ✅ Sửa lỗi typo `completeAt` → `completedAt`
- [x] ✅ Xóa dependency lạ "todox" khỏi package.json
- [x] ✅ Sửa path production build (`../../frontend/dist`)
- [x] ✅ Tạo `.env.example` file
- [x] ✅ Kiểm tra CORS configuration
- [ ] ⚠️ Đảm bảo `.env` không bị commit (đã có trong .gitignore)
- [ ] ⚠️ Test production build locally

### Frontend
- [x] ✅ Sửa lỗi `disable` → `disabled` trong AddTask.jsx
- [x] ✅ Implement DateTimeFilter với API integration
- [x] ✅ Implement TaskListPagination component
- [x] ✅ Xóa dependency lạ "todox" khỏi package.json
- [x] ✅ Sửa `process.env` → `import.meta.env` trong axios.js
- [ ] ⚠️ Test production build locally

### General
- [x] ✅ Cập nhật .gitignore (thêm dist/, build/, etc.)
- [x] ✅ Tạo README.md với hướng dẫn đầy đủ
- [x] ✅ Kiểm tra không có syntax errors
- [ ] ⚠️ Test tất cả features end-to-end

---

## 🧪 Testing Before Deploy

### 1. Test Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Test các tính năng:**
- [ ] ➕ Thêm task mới
- [ ] ✏️ Chỉnh sửa task
- [ ] ✅ Toggle complete/active status
- [ ] 🗑️ Xóa task
- [ ] 🔍 Filter: All/Active/Completed
- [ ] 📅 Date Filter: Today/Week/Month/All
- [ ] 📄 Pagination (tạo > 5 tasks để test)
- [ ] 📊 Statistics hiển thị đúng

### 2. Test Production Build Locally
```bash
# Build frontend
cd frontend
npm run build

# Chạy production server
cd ../backend
NODE_ENV=production npm start

# Truy cập: http://localhost:5001
```

**Test lại tất cả features như trên**

---

## 🚀 Deployment Steps

### Option 1: Deploy Full-stack trên 1 server (Render/Railway/Heroku)

1. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Tạo project mới trên platform**
   - Render: https://render.com/
   - Railway: https://railway.app/
   - Heroku: https://heroku.com/

3. **Cấu hình Environment Variables**
   ```
   MONGODB_CONNECTIONSTRING=mongodb+srv://...
   PORT=5001
   NODE_ENV=production
   ```

4. **Cấu hình Build & Start**
   - Build Command: `npm run build`
   - Start Command: `npm start`

5. **Deploy và kiểm tra logs**

### Option 2: Deploy riêng (Frontend Vercel + Backend Railway)

#### Backend (Railway/Render)
1. Deploy như Option 1
2. Lưu URL: `https://your-backend.railway.app`

#### Frontend (Vercel/Netlify)
1. Tạo file `.env.production` trong frontend:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

2. Cập nhật `frontend/src/lib/axios.js`:
   ```javascript
   const BASE_URL = import.meta.env.VITE_API_URL || "/api";
   ```

3. Cấu hình CORS trong backend để accept frontend URL

4. Deploy frontend lên Vercel/Netlify

---

## 🔍 Post-Deployment Verification

### Functional Tests
- [ ] ✅ Trang load thành công
- [ ] ✅ API endpoints hoạt động
- [ ] ✅ MongoDB connection thành công
- [ ] ✅ Tất cả features hoạt động như local

### Performance Tests
- [ ] ⚡ Page load time < 3s
- [ ] ⚡ API response time < 500ms
- [ ] ⚡ No console errors

### Security Checks
- [ ] 🔒 .env file không bị expose
- [ ] 🔒 MongoDB connection string secure
- [ ] 🔒 CORS properly configured
- [ ] 🔒 No sensitive data in logs

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Kiểm tra connection string
- Whitelist IP address (0.0.0.0/0 cho all IPs)
- Kiểm tra MongoDB Atlas cluster đang chạy

### Issue: 404 on Page Refresh
**Solution:**
- Đảm bảo backend serve static files và có catch-all route
- Đã được fix trong `server.js`

### Issue: CORS Error
**Solution:**
```javascript
// Backend server.js
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### Issue: Environment Variables Not Working
**Solution:**
- Vite: Phải prefix với `VITE_`
- Render/Railway: Set trong dashboard
- Restart server sau khi thay đổi env vars

---

## 📊 Monitoring After Deploy

### What to Monitor:
1. **Server Status**: Uptime, CPU, Memory
2. **Database**: Connections, Query performance
3. **Errors**: Check logs regularly
4. **User Feedback**: Collect and address issues

### Recommended Tools:
- **Logs**: Platform built-in logs
- **Uptime**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry (nếu cần)

---

## 🎉 You're Ready to Deploy!

Sau khi hoàn thành checklist, bạn có thể tự tin deploy ứng dụng!

Good luck! 🚀
