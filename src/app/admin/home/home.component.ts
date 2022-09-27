import { Component, OnInit,ViewChild } from '@angular/core';
import { ContactUsService } from 'src/app/Services/contact-us.service';
import { FeatureService } from 'src/app/Services/feature.service';
import { MessageService } from 'src/app/Services/message.service';
import { PostService } from 'src/app/Services/post.service';
import { PurchaseService } from 'src/app/Services/purchase.service';
import { ReportService } from 'src/app/Services/report.service';
import { UserService } from 'src/app/Services/user.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SarahaWeatherService } from 'src/app/Services/saraha-weather.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
   now = new Date();
   day1 = this.now.getDate();
   
   

  
   mnth =this.now.toLocaleString('default', { month: 'short' });
  constructor( public userservice:UserService , public contactUs:ContactUsService ,public report :ReportService,
    public post : PostService,public active:UserService,public order:PurchaseService,public message:MessageService,
    public featureService:FeatureService,public weatherService :SarahaWeatherService,private loginService :LoginService) { }
//  MessageCount:number = this.message.getMessages().length;

ngOnInit(): void {
  this.featureService.FeatureName();
  this.featureService.FeatureTotalSales();
  this.featureService.getAll();
     this.userservice.getAllLoginUsers();
this.post.getAll();
   this.order.GetAll();
   this.featureService.getAll();
   this.message.getAllMessages();
   this.userservice.getActivePepole();
   this.order.GetOrders();
  
   this.contactUs.GetAll();
   this.userservice.getAll();
    this.userservice.getUserById(Number(localStorage.getItem('userId')));
   this.report.getAllUserReport();
   debugger;
   this.active.Activeusers();
 
   

  }
// ********************************

@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

BarChart :any= [];

canvas: any;
ctx: any;

@ViewChild('mychart') mychart:any;
ngAfterViewInit(){
  this.canvas = this.mychart.nativeElement; 
  this.ctx = this.canvas.getContext('2d');
  new Chart(this.ctx, { 

    type: 'bar',

    data: {

      labels: this.featureService.servName,

      datasets: [{        

        data: this.featureService.servSales,

        backgroundColor: [

          'rgba(255, 99, 132, 0.2)',

          'rgba(255, 159, 64, 0.2)',

          'rgba(255, 205, 86, 0.2)',

          'rgba(75, 192, 192, 0.2)',

          'rgba(54, 162, 235, 0.2)',

          'rgba(153, 102, 255, 0.2)',

          'rgba(201, 203, 207, 0.2)'

        ],

        borderColor: [

          'rgb(255, 99, 132)',

          'rgb(255, 159, 64)',

          'rgb(255, 205, 86)',

          'rgb(75, 192, 192)',

          'rgb(54, 162, 235)',

          'rgb(153, 102, 255)',

          'rgb(201, 203, 207)'

        ],

        borderWidth: 1

      }]

    }

});

}
}
//   // Pie
//   public pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//       datalabels: {
//         formatter: (value, ctx) => {
//           if (ctx.chart.data.labels) {
//             return ctx.chart.data.labels[ctx.dataIndex];
//           }
//         },
//       },
//     }
//   };
//   public pieChartData: ChartData<'pie', any[], any | any[]> = {
//     labels: this.featureService.servName,
//     // labels: ["Ask","Open"],

//     datasets:  [ {
//       data: this.featureService.servSales,
//       //  data: [100,200]
//     } ]
//   };
  
//   // pieChartLabels = this.featureService.servName;
// //   pieChartData:any = [
// //     { 
// //         data: this.featureService.servSales
// //     }
// // ];
//   public pieChartType: ChartType = 'pie';
//   public pieChartPlugins = [ DatalabelsPlugin ];

//   // events
//   public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
//     console.log(event, active);
//   }

//   public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
//     console.log(event, active);
//   }









// **********************************


