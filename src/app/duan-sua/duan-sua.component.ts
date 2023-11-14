import { Component, OnInit } from '@angular/core';
import { DuanService } from '../duan.service';
import { NhanVienService } from '../nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-duan-sua',
  templateUrl: './duan-sua.component.html',
  styleUrls: ['./duan-sua.component.css']
})
export class DuanSuaComponent implements OnInit {
  idDA!: number;
  listDA: any;
  listNV: any;
  duAn: any;
  

  constructor(
    private ativeroute: ActivatedRoute,
    private router: Router,
    private DAservice: DuanService,
    private NVservice: NhanVienService
  ) {}

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

  capnhatDA(): void {
    this.DAservice.capnhatDuAn(this.duAn, this.idDA).subscribe((data: any) => {
      alert('Sửa thành công');
      console.log("Sửa", data);
      this.router.navigate(['/duan']).then(() => {
        location.reload();
      });
    });
  }
}
