import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { NhanVienService } from '../nhan-vien.service';
import { DuanService } from '../duan.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  listNV: any;
  listTask: any;
  listDuAn: any;

  constructor(
    private Taskservice: TaskService,
    private router: Router,
    private NVservice: NhanVienService,
    private DAservice: DuanService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.Taskservice.getTask().subscribe(
      (data) => this.listTask = data,
      (error) => console.error("Lỗi", error)
    );

    this.NVservice.getNhanVien().subscribe(
      (data) => this.listNV = data,
      (error) => console.error("Lỗi", error)
    );

    this.DAservice.getDuAn().subscribe(
      (data) => this.listDuAn = data,
      (error) => console.error("Lỗi", error)
    );
  }

  xoaTask(id: number): void {
    this.Taskservice.xoatask(id).subscribe(
      (data) => {
        this.handleDeleteSuccess();
      }
    );
  }

  private handleDeleteSuccess(): void {
    alert('Xóa thành công');
    window.location.reload();
  }

  findNhanVienName(nhanvienID: number): string {
    if (this.listNV) {
      const nhanvien = this.listNV.find((nv: { id: number }) => nv.id === nhanvienID);
      return nhanvien ? `${nhanvien.ho} ${nhanvien.ten}` : 'Không tìm thấy';
    } else {
      return 'Danh sách nhân viên không có dữ liệu.';
    }
  }

  findDuAn(DuAnId: number): string {
    if (this.listDuAn) {
      const DuAn = this.listDuAn.find((da: { id: number }) => da.id === DuAnId);
      return DuAn ? DuAn.tenDuAn : 'Không tìm thấy';
    } else {
      return 'Danh sách Dự Án không có dữ liệu.';
    }
  }
}
