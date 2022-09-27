import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  event: any=[{
  }]

 
   constructor(private http:HttpClient) { 


   }
   GetAll(){
    debugger;
     this.http.get("https://localhost:44324/api/Event").subscribe((result)=>
     {
       this.event=result;
     })
   }

   create(event:any){
    console.log(event);

    debugger;
    this.http.post('https://localhost:44324/api/Event',event).subscribe((result) =>{
      console.log(result)
    },Erorr =>{
      console.log(Erorr)
    })
    window.location.reload();
  }
 
    delete(id:number)
  {
    
    this.http.delete('https://localhost:44324/api/Event/delete/'+id).subscribe((resp)=>{
    
    },err=>{
     
    })
    window.location.reload();
  }


  Update(event:any)
  {
    debugger;
console.log(event);

this.http.put('https://localhost:44324/api/Event',event).subscribe((resp)=>{
      
    },err=>{
     
    })
   window.location.reload();
  }
}
