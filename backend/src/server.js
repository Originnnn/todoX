import express from 'express';
import taskRoute from './routes/taskRouters.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT || 5001

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware
app.use(express.json());
if(process.env.NODE_ENV !== 'production') {
    app.use(cors({origin: "http://localhost:5173"}));
}

app.use("/api/tasks",taskRoute)

if(process.env.NODE_ENV === 'production') {
    // Path từ backend/src/server.js đến frontend/dist
    const frontendDistPath = path.join(__dirname, '../../frontend/dist');
    
    app.use(express.static(frontendDistPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
            if (err) {
                console.error('Error serving index.html:', err);
                res.status(500).send('Error loading application');
            }
        });
    });
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bat dau tren cong ${PORT}`);
    });
});


