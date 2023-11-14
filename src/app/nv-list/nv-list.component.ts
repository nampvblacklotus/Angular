import { Component, OnInit } from '@angular/core';
import { NhanVienService } from '../nhan-vien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nv-list',
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css']
})
export class NvListComponent implements OnInit {
  listNV: any;

  constructor(
    private NVservice: NhanVienService,
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
  }

  xoaNV(id: number): void {
    this.NVservice.xoaNhanVien(id).subscribe(
      (data) => {
        this.handleDeleteSuccess();
      }
    );
  }

  private handleDeleteSuccess(): void {
    alert('Xóa thành công');
    window.location.reload();
  }
}
