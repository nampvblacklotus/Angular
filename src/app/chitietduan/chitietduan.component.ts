import { Component, OnInit } from '@angular/core';
import { DuanService } from '../duan.service';
import { NhanVienService } from '../nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-chitietduan',
  templateUrl: './chitietduan.component.html',
  styleUrls: ['./chitietduan.component.css']
})
export class ChitietduanComponent  implements OnInit{
  idDA!: number;
  listDA: any;
  listNV: any;
  duAn: any;
  constructor(private ativeroute: ActivatedRoute,
    private router: Router,
    private DAservice: DuanService,
    private NVservice: NhanVienService){}
  ngOnInit(): void {
    this.idDA = Number(this.ativeroute.snapshot.params['id']);
    this.loadData();
  }
    
  loadData(): void {
    this.DAservice.getDuAn().subscribe(
      (data) => {
        this.listDA = data;
        this.duAn = this.listDA.find((da: any) => da.id === this.idDA);
      },
      (error) => console.error("Lỗi", error)
    );
    this.NVservice.getNhanVien().subscribe(
      (data) => this.listNV = data,
      (error) => console.error("Lỗi", error)
    );
  }

  findNhanVienName(nhanvienID: number): string {
    const nhanvien = this.listNV?.find((nv: { id: number }) => nv.id === nhanvienID);
    return nhanvien ? nhanvien.ho + ' ' + nhanvien.ten : 'Không tìm thấy';
  }

 


}
