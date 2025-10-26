import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "complete"],
        default: "active",
    },
    completedAt: {
        type: Date,
        default: null,
    },

}, 
{
    timestamps: true, //CreatedAt va updatedAt tu dong them vao
});

const Task = mongoose.model("Task", taskSchema);

export default Task;