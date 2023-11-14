import { Component, OnInit } from '@angular/core';
import { NhanVienService } from '../nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nv-sua',
  templateUrl: './nv-sua.component.html',
  styleUrls: ['./nv-sua.component.css']
})
export class NvSuaComponent implements OnInit {
  idNV!: number;
  listNv: any;
  nhanVien: any;

  constructor(
    private ativeroute: ActivatedRoute,
    private router: Router,
    private NVservice: NhanVienService
  ) {}

  ngOnInit(): void {
    this.idNV = Number(this.ativeroute.snapshot.params['id']);
    this.loadData();
  }

  loadData(): void {
    this.NVservice.getNhanVien().subscribe(
      (data) => {
        this.listNv = data;
        this.nhanVien = this.listNv.find((nv: any) => nv.id === this.idNV);
      },
      (error) => console.error("Lỗi", error)
    );
  }

  capnhatNV(): void {
    this.NVservice.capnhatNhanVien(this.nhanVien, this.idNV).subscribe((data: any) => {
      this.handleUpdateSuccess();
    });
  }

  private handleUpdateSuccess(): void {
    alert('Sửa thành công');
    this.router.navigate(['/nhanvien']).then(() => {
      location.reload();
    });
  }
}
