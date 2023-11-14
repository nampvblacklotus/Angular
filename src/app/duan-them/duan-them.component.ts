import { Component, OnInit } from '@angular/core';
import { NhanVienService } from '../nhan-vien.service';
import { DuanService } from '../duan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-them',
  templateUrl: './duan-them.component.html',
  styleUrls: ['./duan-them.component.css']
})
export class DuanThemComponent implements OnInit {
  listDuAn: any;
  listNV: any;
  newDuAn: any = {};

  constructor(
    private NVservice: NhanVienService,
    private DAservice: DuanService,
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
  }

  themDA(): void {
    const maxId = Math.max(...this.listDuAn.map((p: { id: any }) => p.id));
    this.newDuAn.id = maxId + 1;
    console.log(maxId, this.newDuAn.id);

    this.DAservice.themDuAn(this.newDuAn).subscribe(
      (data) => {
        alert('Thêm dự án thành công');
        this.router.navigate(['/duan']);
      }
    );
    console.log(this.listDuAn);
  }
}
