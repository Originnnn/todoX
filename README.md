# TodoX - Task Management Application

Ứng dụng quản lý công việc (To-Do List) hiện đại với đầy đủ tính năng CRUD, phân trang, và lọc theo thời gian.

## 🚀 Tính Năng

- ✅ **CRUD Operations**: Tạo, đọc, cập nhật, xóa tasks
- 📊 **Statistics**: Thống kê số lượng tasks active/completed
- 🔍 **Filters**: Lọc tasks theo trạng thái (All/Active/Completed)
- 📅 **Date Filters**: Lọc theo thời gian (Hôm nay/Tuần này/Tháng này/Tất cả)
- 📄 **Pagination**: Phân trang với 5 tasks mỗi trang
- 🎨 **Modern UI**: Giao diện đẹp với Tailwind CSS và shadcn/ui
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI Components
- **React Router** - Routing
- **Axios** - HTTP Client
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📦 Cài Đặt

### Prerequisites
- Node.js >= 16
- MongoDB (local hoặc MongoDB Atlas)

### 1. Clone repository
```bash
git clone https://github.com/Originnnn/todoX.git
cd todoX
```

### 2. Cấu hình Backend
```bash
cd backend
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa .env với thông tin MongoDB của bạn
# MONGODB_CONNECTIONSTRING=your_mongodb_connection_string
# PORT=5001
# NODE_ENV=development
```

### 3. Cấu hình Frontend
```bash
cd ../frontend
npm install
```

## 🚀 Chạy Ứng Dụng

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend sẽ chạy tại: `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

### Production Mode

**Build và chạy:**
```bash
# Từ root folder
npm run build
npm start
```

App sẽ chạy tại: `http://localhost:5001`

## 📁 Cấu Trúc Project

```
todoX/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── taskControllers.js # Business logic
│   │   ├── models/
│   │   │   └── Task.js            # Task schema
│   │   ├── routes/
│   │   │   └── taskRouters.js     # API routes
│   │   └── server.js              # Express server
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                # shadcn/ui components
│   │   │   ├── AddTask.jsx
│   │   │   ├── DateTimeFilter.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatsAndFilters.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskEmptyState.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskListPagination.jsx
│   │   ├── lib/
│   │   │   ├── axios.js           # API client
│   │   │   ├── data.js            # Constants
│   │   │   └── utils.js           # Utilities
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── package.json                   # Root package.json
```

## 🔌 API Endpoints

### Tasks
- `GET /api/tasks?filter=today|week|month|all` - Lấy danh sách tasks
- `POST /api/tasks` - Tạo task mới
- `PUT /api/tasks/:id` - Cập nhật task
- `DELETE /api/tasks/:id` - Xóa task

### Response Format
```json
{
  "tasks": [...],
  "activeCount": 5,
  "completeCount": 3
}
```

## 🎨 Features Chi Tiết

### 1. Task Management
- Thêm task mới với Enter hoặc nút "Thêm"
- Chỉnh sửa task inline
- Đánh dấu hoàn thành/chưa hoàn thành
- Xóa task

### 2. Filtering & Statistics
- Lọc theo trạng thái: All/Active/Completed
- Lọc theo thời gian: Hôm nay/Tuần này/Tháng này/Tất cả
- Hiển thị số lượng tasks active/completed

### 3. Pagination
- 5 tasks mỗi trang
- Tự động ẩn khi < 5 tasks
- Previous/Next buttons
- Số trang với ellipsis khi nhiều trang
- Auto scroll to top khi chuyển trang

## 🚀 Deploy

### Deploy trên Render/Railway/Heroku

1. **Cấu hình Environment Variables:**
   ```
   MONGODB_CONNECTIONSTRING=your_mongodb_atlas_connection_string
   PORT=5001
   NODE_ENV=production
   ```

2. **Build command:**
   ```bash
   npm run build
   ```

3. **Start command:**
   ```bash
   npm start
   ```

### Deploy Frontend riêng (Vercel/Netlify)

Nếu deploy frontend riêng, cần:
1. Thêm environment variable `VITE_API_URL`
2. Cập nhật `frontend/src/lib/axios.js`:
   ```javascript
   const BASE_URL = import.meta.env.VITE_API_URL || "/api";
   ```
3. Cấu hình CORS trong backend

## 🐛 Troubleshooting

### MongoDB Connection Error
- Kiểm tra connection string trong `.env`
- Đảm bảo MongoDB đang chạy (local) hoặc whitelist IP (Atlas)

### CORS Error
- Kiểm tra backend đang chạy tại đúng port
- Kiểm tra CORS config trong `server.js`

### Build Error
- Xóa `node_modules` và `package-lock.json`
- Chạy lại `npm install`

## 📝 License

MIT

## 👤 Author

GitHub: [@Originnnn](https://github.com/Originnnn)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide](https://lucide.dev/) - Icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
