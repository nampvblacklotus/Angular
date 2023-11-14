import { Component, OnInit } from '@angular/core';
import { DuanService } from '../duan.service';
import { NhanVienService } from '../nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-sua',
  templateUrl: './task-sua.component.html',
  styleUrls: ['./task-sua.component.css']
})
export class TaskSuaComponent implements OnInit {
  idtask!: number;
  listDA: any;
  listNV: any;
  listTask: any;
  Task: any = {};

  constructor(
    private ativeroute: ActivatedRoute,
    private router: Router,
    private DAservice: DuanService,
    private NVservice: NhanVienService,
    private Taskservice: TaskService
  ) {}

  ngOnInit(): void {
    this.idtask = Number(this.ativeroute.snapshot.params['id']);
    this.loadData();
  }

  loadData(): void {
    this.DAservice.getDuAn().subscribe(
      (data) => this.listDA = data,
      (error) => console.error("Lỗi", error)
    );

    this.NVservice.getNhanVien().subscribe(
      (data) => this.listNV = data,
      (error) => console.error("Lỗi", error)
    );

    this.Taskservice.getTask().subscribe(
      (data) => {
        this.listTask = data;
        this.Task = this.listTask.find((da: any) => da.id === this.idtask);
      },
      (error) => console.error("Lỗi", error)
    );
  }

  capnhatTask(): void {
    this.Taskservice.capnhatTask(this.Task, this.idtask).subscribe((data: any) => {
      this.handleUpdateSuccess();
    });
  }

  private handleUpdateSuccess(): void {
    alert('Sửa thành công');
    this.router.navigate(['/task']).then(() => {
      location.reload();
    });
  }
}
