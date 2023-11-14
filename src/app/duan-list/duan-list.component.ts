import { Component, OnInit } from '@angular/core';
import { DuanService } from '../duan.service';
import { NhanVienService } from '../nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-duan-list',
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css']
})
export class DuanListComponent implements OnInit {
  listDA: any;
  listNV: any;

  constructor(
    private DAservice: DuanService,
    private NVservice: NhanVienService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
  }

  xoaDA(id: number): void {
    this.DAservice.xoaDuAn(id).subscribe(
      (data) => {
        alert('Xóa thành công');
        window.location.reload();
      }
    );
  }

  // kiemtra(): void {
  //   console.log(this.listNV);
  // }

  findNhanVienName(nhanvienID: number): string {
    const nhanvien = this.listNV?.find((nv: { id: number }) => nv.id === nhanvienID);
    return nhanvien ? nhanvien.ho + ' ' + nhanvien.ten : 'Không tìm thấy';
  }
}
