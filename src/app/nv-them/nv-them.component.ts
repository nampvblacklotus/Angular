import { Component, OnInit } from '@angular/core';
import { NhanVienService } from '../nhan-vien.service';
import { DuanService } from '../duan.service';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { NhanVien } from '../nhanvien';

@Component({
  selector: 'app-nv-them',
  templateUrl: './nv-them.component.html',
  styleUrls: ['./nv-them.component.css']
})
export class NvThemComponent implements OnInit {
  listDuAn: any;
  listNV: any;
  listTask: any;
  newNV: any ={};

  constructor(
    private NVservice: NhanVienService,
    private DAservice: DuanService,
    private Taskservice: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.NVservice.getNhanVien().subscribe(
      (data) => this.listNV = data,
      (error) => console.error("Lỗi", error)
    );

    this.DAservice.getDuAn().subscribe(
      (data) => this.listDuAn = data,
      (error) => console.error("Lỗi", error)
    );

    this.Taskservice.getTask().subscribe(
      (data) => this.listTask = data,
      (error) => console.error("Lỗi", error)
    );
  }

  themNhanVien(): void {
    const maxId = Math.max(...this.listNV.map((nhanvien: { id: any }) => nhanvien.id));
    this.newNV.id = maxId + 1;
    console.log(maxId);

    this.NVservice.themNhanVien(this.newNV).subscribe(
      (data) => {
        this.handleAddSuccess();
      }
    );
    console.log(this.listNV);
  }

  private handleAddSuccess(): void {
    alert('Thêm Nhân Viên thành công');
    this.router.navigate(['/nhanvien']).then(() => {
      location.reload();
    });
  }
}
