import React, { useState } from 'react'
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import api from '@/lib/axios';

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if(newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {title: newTaskTitle});
        toast.success(`Nhiem vu ${newTaskTitle} da duoc them vao`);
        handleNewTaskAdded();
        setNewTaskTitle("");
      } catch (error) {
        console.error("Loi xay ra khi them Task", error);
        toast.error("Loi xay ra khi them nhiem vu moi");
      }
    } else {
      toast.error("Ban can nhap noi dung cua nhiem vu");
    }
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      addTask();
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
        type="text"
        placeholder="Can phai lam gi"
        className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        value={newTaskTitle}
        onChange={(event) => setNewTaskTitle(event.target.value)}
        onKeyPress={handleKeyPress}
        />
      <Button 
      variant="gradient"
      size="xl"
      className="px-6"
      onClick={addTask}
      disabled={!newTaskTitle.trim()}
      >
        <Plus className="size-5"/>
        Them
      </Button>
      </div>
    </Card>
  );
};

export default AddTask;