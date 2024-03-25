import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';



@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrl: './category-icon.component.css',
})
export class CategoryIconComponent {
  @Input() parentForm!: FormGroup
  categoryIcon = 'home'

  constructor(
    private conversionEngineService: ConversionEngineService){}

  ngOnInit(): void{
    //category change detection
    this.parentForm.get('categoryValue')?.valueChanges.subscribe((category:string)=>{
        this.updateIcon(category)
    })

    this.updateIcon(this.parentForm.get('categoryValue')?.value)
  }
  private updateIcon(category:string | null):void {
    const iconMappings: {[key:string]:string} ={
      Currency: 'currency_exchange',
      Distance: 'edit_road',
      Temperature: 'device_thermostat',
      Weight: 'fitness_center'


    }

    this.categoryIcon = iconMappings[category as string]

  }

}

