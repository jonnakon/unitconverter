import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-conversion-output',
  templateUrl: './conversion-output.component.html',
  styleUrl: './conversion-output.component.css'
})
export class ConversionOutputComponent {
  @Input() parentForm!: FormGroup

  conversionOutUnitText = "Output"


  constructor(private conversionEngineService: ConversionEngineService){}

  ngOnInit(): void {
   //category change detection

    //change detection in input
    this.parentForm.get("conversionInput")?.valueChanges.subscribe((value)=> {
      if(value === null || value ===""){
        this.parentForm.get('conversionOutput')?.setValue("")
        return
      }

      let catName = this.parentForm.get("categoryValue")?.value
      let convName = this.parentForm.get("converterValue")?.value

      if(convName !== ""){
        let outValue = this.conversionEngineService.convertValue(catName, convName, value)
        this.parentForm.controls['conversionOutput'].setValue(outValue)
      } else {
        this.parentForm.controls['conversionOutput'].setValue("")
      }
    })
    this.parentForm.get("converterValue")?.valueChanges.subscribe((value)=> {
      this.parentForm.controls['conversionOutput'].setValue("")
      this.parentForm.controls['conversionInput'].setValue("")

    })
  }

}
