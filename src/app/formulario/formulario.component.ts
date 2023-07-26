import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public tipoPago:string[]=['EFECTIVO','TRANSFERENCIA','TARJETA'];
  public form:FormGroup=this.fb.group({
    concepto:['',Validators.required],
    nEquipo:['',Validators.required],
    tipoPago:['',Validators.required],
    saldo:[0,[Validators.required]],
    ingreso:[0,Validators.required],
    egreso:[0,Validators.required],
    observacion:['',Validators.required]

  });
  @Output() registerAdded= new EventEmitter();
  constructor(private fb:FormBuilder,private service:InformationService) { }



  ngOnInit(): void {
  }
  public calculoSaldo(monto:HTMLInputElement){
    console.log(monto.name);
    const valor=monto.value;
    if(monto.name=='ingreso'){
      this.form.controls['saldo'].setValue(valor);
    }else{
      this.form.controls['saldo'].setValue(parseInt(this.form.controls['ingreso'].value) - (parseInt(valor)));
    }
  }
  public AgregarRegistro():void{

    if(this.form.valid == false || this.form.errors){
      alert("Debe de seleccionar todos los campos");
      return;
    }
    const date= new Date();
    const fecha=date.getFullYear()+"-"+(date!.getMonth()+1)+"-"+date?.getDate();
    const registro={
      concepto:this.form.controls['concepto'].value,
      nEquipo:this.form.controls['nEquipo'].value,
      tipoPago:this.form.controls['tipoPago'].value,
      saldo:this.form.controls['saldo'].value,
      ingreso:this.form.controls['ingreso'].value,
      egreso:this.form.controls['egreso'].value,
      observacion:this.form.controls['observacion'].value,
      fechaActual:fecha

    }
   this.form.controls['concepto'].setValue(''),
      this.form.controls['nEquipo'].setValue(''),
      this.form.controls['tipoPago'].setValue(''),
      this.form.controls['saldo'].setValue(0),
      this.form.controls['ingreso'].setValue(0),
      this.form.controls['egreso'].setValue(0),
      this.form.controls['observacion'].setValue(''),


    this.service.agregarRegistro(registro).subscribe(res=>{
        console.log("RESPUESTA: ",res);
        this.registerAdded.emit(fecha);
    });
  }

}
