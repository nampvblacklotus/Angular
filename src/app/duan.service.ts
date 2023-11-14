import { Injectable } from '@angular/core';
import { DuAn } from './du-an';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DuanService {
 
  constructor(private h:HttpClient) {}

  themDuAn(duAn: any) {
    return this.h.post('http://localhost:3000/DuAn', duAn);
  }
  getMotDA(idDa: any){
    return this.h.get('http://localhost:3000/DuAn/' + idDa);
  }
  getDuAn(){
    return this.h.get('http://localhost:3000/DuAn');
  }

  capnhatDuAn(DuAn: any, idDA: any){
    return this.h.put('http://localhost:3000/DuAn/' + idDA ,DuAn);
  }
  xoaDuAn(id:number = 0){
    return this.h.delete('http://localhost:3000/DuAn/'+ id)
    
  }

}
