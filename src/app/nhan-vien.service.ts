import { Injectable } from '@angular/core';
import { NhanVien } from './nhanvien';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  
  constructor(private h:HttpClient){}
  themNhanVien(nhanVien: any) {
    return this.h.post('http://localhost:3000/NhanVien', nhanVien);
  }
  // getMotNV(id:number=1){
  //   return this.listNhanVien.find(p => p.id == id)
  // }
  getNhanVien(){
    return this.h.get('http://localhost:3000/NhanVien');
  }

  capnhatNhanVien(nhanVien:any, idNV:any){
    return this.h.put('http://localhost:3000/NhanVien/' + idNV ,nhanVien);
  }
  xoaNhanVien(id:number = 0){
    return this.h.delete('http://localhost:3000/NhanVien/'+ id)
    
  }
}
