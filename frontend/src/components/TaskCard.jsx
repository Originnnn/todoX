import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar, CheckCircle, Circle, SquarePen, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({task, index, handleTaskChanged}) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
    
    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success("Nhiem vu da duoc xoa");
            handleTaskChanged();
        } catch (error) {
            console.error("Loi xay ra khi xoa Task", error);
            toast.error("Loi xay ra khi xoa nhiem vu moi");
        }
    }

    const updateTask = async () => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, {
                title: updateTaskTitle
            });
            toast.success(`Nhiem vu da doi thanh ${updateTaskTitle}`)
            handleTaskChanged();
        } catch (error) {
            console.error("Loi xay ra khi update Task", error);
            toast.error("Loi xay ra khi cap nhat nhiem vu ");
        }
    }

    const toggleTaskStatus = async () => {
        try {
            const newStatus = task.status === 'complete' ? 'active' : 'complete';
            await api.put(`/tasks/${task._id}`, {
                status: newStatus
            });
            toast.success(`Nhiem vu da ${newStatus === 'complete' ? 'hoan thanh' : 'kich hoat'}`);
            handleTaskChanged();
        } catch (error) {
            console.error("Loi xay ra khi cap nhat trang thai", error);
            toast.error("Loi xay ra khi cap nhat trang thai");
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            updateTask();
        }
    }

    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "complete" && "opacity-75"
        )} style={{animationDelay: `${index * 50}ms`}}
        >
            <div className='flex items-center gap-4'>
                {/*nut tron */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "complete"
                        ? "text-success hover:text-success/80"
                        : "text-muted-foreground hover:text-primary"     
                    )}
                    onClick={toggleTaskStatus}
                >
                    {task.status === 'complete' 
                    ? (<CheckCircle className='size-5'/>) 
                    : (<Circle className="size-5"/>)} 
                </Button>
                {/*hien thi va chinh sua title*/}
                <div className="flex-1 min-w-0">
                    {isEditting ? (
                        <Input
                            placeholder="Can phai lam gi?"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditting(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                            autoFocus
                        />
                    ) : (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === 'complete' 
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        )}>
                            {task.title}
                        </p>
                    )}
                    {/*Ngay tao va ngay hoan thanh */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground"/>
                        <span className='text-xs text-muted-foreground'>
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completeAt && (
                            <>
                                <span className="text-xs text-muted-foreground"> - </span>
                                <Calendar className="size-3 text-muted-foreground"/>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completeAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                
                {/*Nut chinh va nut xoa */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/*Nut edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdateTaskTitle(task.title || "")
                        }}>
                        <SquarePen className="size-4"/>
                    </Button>
                    {/*nut Delete */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}>
                        <Trash2 className="size-4"/>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard;

