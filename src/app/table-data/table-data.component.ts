import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  constructor(private service:InformationService) { }
  public data:any;
  public efectivo:number=0;
  public tarjeta:number=0;
  public transferencia:number=0;
  ngOnInit(): void {
  }
  public change(event:MatDatepickerInputEvent<Date>):void{
    this.tarjeta=0;
    this.transferencia=0;
    this.efectivo=0;
    const fecha=event.value?.getFullYear()+"-"+(event.value!.getMonth()+1)+"-"+event.value?.getDate();
    this.service.getIncomes(fecha).subscribe(res=>{

      this.data=res.incomes;

     this.data.forEach((income:any)=>{

      var monto =parseInt(income.Saldo);
      switch(income.TipoPago){

        case 'EFECTIVO':
          this.efectivo+=monto;
          break;
          case 'TRANSFERENCIA':
          this.transferencia+=monto;
          break;
          case 'TARJETA':
          this.tarjeta+=monto;
          break;
      }
     });


  });
}
}
