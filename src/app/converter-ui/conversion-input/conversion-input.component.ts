import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-conversion-input',
  templateUrl: './conversion-input.component.html',
  styleUrl: './conversion-input.component.css'
})
export class ConversionInputComponent implements OnInit {

  @Input() parentForm!: FormGroup

  conversionInUnitText = "Input"


  constructor(private conversionEngineService: ConversionEngineService){}

  ngOnInit(): void{
    
    //category change detection
    this.parentForm.get('categoryValue')?.valueChanges.subscribe(()=>{
      this.conversionInUnitText = "Input"
      this.parentForm.get('conversionInput')?.setValue("")
    })
  

  //conversion change detection

  this.parentForm.get('converterValue')?.valueChanges.pipe(
    startWith(this.parentForm.get('converterValue')?.value) 
  ).subscribe((value) => {
    let catName = this.parentForm.get("categoryValue")?.value
    if (catName !== "") {
      let conversionDef = this.conversionEngineService.getCurrentConversionDef(catName, value)
      this.conversionInUnitText = "Input as " + conversionDef?.inUnit
    }
  });
  }
}

