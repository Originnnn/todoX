import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Lien ket co so du lieu thanh cong");
    } catch (error) {
        console.log("Lien ket that bai: ", error);
        process.exit(1);
    }
}