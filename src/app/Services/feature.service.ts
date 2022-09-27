import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http:HttpClient) { }
  feature: any = []
  featureImage : any;

  getAll(){
    this.http.get('https://localhost:44324/api/Feature/GetFeatures').subscribe((res)=>{
    this.feature=res;
    },err=>{
    
    })

  }
  // servName : any =new Array<string>();
  servName : any =new Array<string>();
  servSales :any=[];
  featureSales :any = []
  
  FeatureTotalSales(){
    console.log("sajaaaaaaaaaaa");
    this.http.get('https://localhost:44324/api/Feature/featureTotalSales').subscribe((res)=>{
      this.servSales= res;
      console.log(this.servSales);
    },err=>{
    
    })
  }
  FeatureName(){
    this.http.get('https://localhost:44324/api/Feature/featureName').subscribe((res)=>{
      this.servName=res;
      console.log("sajaaaaaaaaaaa");
      console.log(this.servName);
    },err=>{
    
    })
  }
  createService(feature:any){
    console.log(feature);
    if(this.featureImage != null)
    {feature.imagePath = this.featureImage.imagePath;}

    debugger;
    this.http.post('https://localhost:44324/api/Feature/CreateFeature',feature).subscribe((result) =>{
      console.log(result)
    },Erorr =>{
      console.log(Erorr)
    })
    window.location.reload();
  }
 
    deleteService(id:number)
  {
    
    this.http.delete('https://localhost:44324/api/Feature/RemoveFeature/'+id).subscribe((resp)=>{
    
    },err=>{
     
    })
    window.location.reload();
  }


  UpdateService (body:any)
  {
    // this.spinner.show();
    if(this.featureImage != null)
   { body.imagePath=this.featureImage.imagePath;}
    debugger;
console.log(body);

this.http.put('https://localhost:44324/api/Feature/UpdateFeature',body).subscribe((resp)=>{
      // this.spinner.hide();
      // this.toaster.success('Updated |Successfully');
    },err=>{
      // this.spinner.hide();
      // this.toaster.error(err.message);
    })
   window.location.reload();
  }



  uploadFeatureImage(file : FormData){
    this.http.post('https://localhost:44324/api/Feature/CreateImagePath',file).subscribe((result) => {
      debugger;
      this.featureImage = result;
      console.log(this.featureImage);
    },err => {
      console.log(err)
    })
  
  }
  

}
  


