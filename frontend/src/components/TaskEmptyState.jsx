import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
    className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
        <div className='space-y-3'>
            <Circle className='size-12 mx-auto text-muted-foreground'/>
            <div>
                <h3 className='font-md text-foreground'>
                    {
                        filter === 'active' ?
                        "Khong co nhiem vu nao dang lam" :
                        filter === 'completed' ?
                        "Khong co nhiem vu nao hoan thanh" :
                        "Chua co nhiem vu"
                    }
                </h3>
                <p className="text-sm text-muted-foreground">
                    {
                        filter === "all" 
                        ? "Them nhiem vu dau tien vao de bat dau"
                        :`Chuyen sang "tat ca" de thay nhung nhiem vu" ${filter === "active" ? "da hoan thanh" : "dang lam"}`
                    }
                </p>
            </div>
        </div>
    </Card>
  )
}

export default TaskEmptyState