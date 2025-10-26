# 🚀 Render Deployment Guide

## Cách Deploy TodoX lên Render

### 📋 Prerequisites
- Tài khoản Render: https://render.com
- GitHub repository với code đã push
- MongoDB Atlas connection string

---

## 🎯 Step-by-Step Deployment

### 1. Chuẩn Bị

**Đảm bảo đã push code:**
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Tạo Web Service trên Render

1. Đăng nhập vào https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository của bạn
4. Chọn repository `todoX`

### 3. Cấu Hình Web Service

#### Basic Settings:
- **Name**: `todox` (hoặc tên bạn muốn)
- **Region**: Singapore (hoặc gần bạn nhất)
- **Branch**: `main`
- **Root Directory**: (để trống)
- **Runtime**: `Node`

#### Build & Deploy:
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
  
- **Start Command**:
  ```bash
  npm start
  ```

#### Advanced Settings:
- **Instance Type**: Free
- **Auto-Deploy**: Yes (tự động deploy khi push code)

### 4. Environment Variables

Click **"Advanced"** và thêm các Environment Variables:

| Key | Value |
|-----|-------|
| `MONGODB_CONNECTIONSTRING` | `mongodb+srv://mtck:2dEyTcLUO6Z8tPmD@cluster0...` |
| `PORT` | `5001` |
| `NODE_ENV` | `production` |

⚠️ **Quan trọng**: Paste chính xác MongoDB connection string từ file `.env` của bạn

### 5. Deploy

1. Click **"Create Web Service"**
2. Render sẽ bắt đầu build và deploy
3. Theo dõi logs để xem tiến trình

### 6. Kiểm Tra MongoDB Atlas

**Whitelist Render's IP:**
1. Đăng nhập MongoDB Atlas
2. Vào **Network Access**
3. Click **"Add IP Address"**
4. Chọn **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

⚠️ **Chú ý**: Nếu không whitelist IP, kết nối sẽ bị từ chối!

---

## 📊 Kiểm Tra Deployment

### Sau khi deploy thành công:

1. **Check Logs**: Xem có lỗi gì không
   ```
   server bat dau tren cong 5001
   Lien ket co so du lieu thanh cong
   ```

2. **Test URL**: Render sẽ cung cấp URL như:
   ```
   https://todox-xxxx.onrender.com
   ```

3. **Test Features**:
   - ✅ Trang chủ load được
   - ✅ Thêm task mới
   - ✅ Sửa, xóa task
   - ✅ Filter hoạt động
   - ✅ Pagination hoạt động

---

## 🐛 Troubleshooting

### Issue 1: Build Failed
**Error**: `npm ERR! missing script: build`

**Solution**: Đảm bảo `package.json` ở root có:
```json
{
  "scripts": {
    "build": "npm install --prefix frontend && npm install --prefix backend && npm run build --prefix frontend",
    "start": "npm run start --prefix backend"
  }
}
```

### Issue 2: MongoDB Connection Error
**Error**: `MongoServerError: bad auth`

**Solution**:
- Kiểm tra username/password trong connection string
- Đảm bảo không có ký tự đặc biệt chưa encode
- Thử tạo user mới trên MongoDB Atlas

### Issue 3: IP Not Whitelisted
**Error**: `MongoServerError: connection timed out`

**Solution**:
- Vào MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (Allow all)
- Đợi 2-3 phút để apply

### Issue 4: ENOENT index.html
**Error**: `ENOENT: no such file or directory, stat '/opt/render/project/frontend/dist/index.html'`

**Solution**:
- Build command phải chạy `npm run build --prefix frontend`
- Đảm bảo `NODE_ENV=production` trong env vars
- Check logs xem build có thành công không

### Issue 5: 404 on Refresh
**Error**: Refresh trang bị 404

**Solution**: Đã được fix trong `server.js` với catch-all route `app.get("*", ...)`

---

## 🔄 Update Deployment

Khi bạn thay đổi code:

1. **Push lên GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Auto Deploy**: Render sẽ tự động detect và deploy lại

3. **Manual Deploy**: Hoặc vào Render Dashboard → Manual Deploy → Deploy latest commit

---

## 📱 Custom Domain (Optional)

### Thêm domain riêng:

1. Vào Render Dashboard → Settings
2. Click **"Add Custom Domain"**
3. Nhập domain của bạn: `todox.yourdomain.com`
4. Cấu hình DNS theo hướng dẫn của Render:
   - Type: `CNAME`
   - Name: `todox`
   - Value: `todox-xxxx.onrender.com`

5. Đợi DNS propagate (5-30 phút)

---

## 💰 Pricing

### Free Tier:
- ✅ 750 hours/month
- ✅ Auto sleep sau 15 phút không hoạt động
- ✅ Cold start ~30 giây khi wake up
- ⚠️ Không có persistent storage (dùng MongoDB Atlas)

### Paid Tier ($7/month):
- ✅ Always on
- ✅ No cold starts
- ✅ More resources

---

## 🎉 Done!

Ứng dụng của bạn đã live tại:
```
https://todox-xxxx.onrender.com
```

Share link này với bạn bè để họ dùng thử! 🚀

---

## 📞 Support

Nếu gặp vấn đề:
1. Check Render logs
2. Check MongoDB Atlas metrics
3. Xem phần Troubleshooting ở trên
4. Contact Render support (nếu cần)
