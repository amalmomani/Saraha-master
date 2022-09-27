import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }
  reports : any = [{}]
  Report :any =[{}]
  getAllUserReport(){
    this.http.get('https://localhost:44324/api/Report/UserReport').subscribe((res)=>{
    this.reports=res;
    
    },err=>{
    
    })
  }
  getAllReport(){
    this.http.get('https://localhost:44324/api/Report/').subscribe((res)=>{
    this.Report=res;
    
    },err=>{
    
    })
  }


  createReport(report:any){
    this.http.post("https://localhost:44324/api/Report",report).subscribe((result) => {
      this.toastr.success("Report User Successfully")

    },error =>{
      console.log(error);
    })

  }
}
