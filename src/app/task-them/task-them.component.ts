import { Component, OnInit } from '@angular/core';
import { DuanService } from '../duan.service';
import { NhanVienService } from '../nhan-vien.service';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-them',
  templateUrl: './task-them.component.html',
  styleUrls: ['./task-them.component.css']
})
export class TaskThemComponent implements OnInit {
  listTask: any;
  listNV: any;
  listDuAn: any;
  newTask: any = {};

  constructor(
    private Taskservice: TaskService,
    private NVservice: NhanVienService,
    private DAservice: DuanService,
    private router: Router,
    private h: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.NVservice.getNhanVien().subscribe(
      (data) => this.listNV = data,
      (error) => console.error("Lỗi", error)
    );

    this.Taskservice.getTask().subscribe(
      (data) => this.listTask = data,
      (error) => console.error("Lỗi", error)
    );

    this.DAservice.getDuAn().subscribe(
      (data) => this.listDuAn = data,
      (error) => console.error("Lỗi", error)
    );
  }

  themTask(): void {
    const maxId = Math.max(...this.listTask.map((task: { id: any; }) => task.id));
    this.newTask.id = maxId + 1;

    this.Taskservice.themTask(this.newTask).subscribe(
      (data) => {
        this.handleAddTaskSuccess();
      }
    );
  }

  private handleAddTaskSuccess(): void {
    alert('Thêm task thành công');
    this.router.navigate(['/task']);
  }
}
