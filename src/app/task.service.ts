import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private h:HttpClient) {}
  themTask(task: any) {
    return this.h.post('http://localhost:3000/Task', task);
  }
  // getMotTask(id:number=1){
  //   return this.listTask.find(p => p.id == id)
  // }
  getTask(){
    return this.h.get('http://localhost:3000/Task');
  }

  capnhatTask(Task:any, idtask:any){
    return this.h.put('http://localhost:3000/Task/' + idtask ,Task);
  }
  xoatask(id:number ){
    return this.h.delete('http://localhost:3000/Task/'+ id)

    
  }
}
