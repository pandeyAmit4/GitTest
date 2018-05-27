import { Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { NG_VALIDATORS,Validator, Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {DataService} from '../../service/data.service'

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['../../../../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css','./convert.component.css']
})
export class ConvertComponent implements OnInit {
  currencies: any;
  currencyToBeChanged: number;
  currType:number;
  
  private regex: RegExp = new RegExp(/^[0-9]*\.?[0-9]*$/g);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];
  
  @ViewChild('changeRate') changeRate: ElementRef;
  constructor(private dataservice: DataService) {
    // console.log("in convert component constructor");
    // console.log(dataservice.getConversionRate());
   }
   keys() : Array<string> {
    return Object.keys(this.currencies.rates);
  }
   iamclicked(inputValue){
     this.currencyToBeChanged=inputValue;
     this.currType = (this.changeRate.nativeElement.value * this.currencyToBeChanged);
    //  console.log(this.changeRate.nativeElement.value);
   }
   currencyTypeChanged(event){
     if(this.currencyToBeChanged){
      this.currType=(event.target.value * this.currencyToBeChanged);
     }
   }
   getDetails(event){
     let selector=this.changeRate.nativeElement;
    let text=selector.options[selector.selectedIndex].text;
    //  console.log(this.changeRate.nativeElement);
    alert("Current Change Rate for "+ text +" Is: "+this.changeRate.nativeElement.value);
   }
    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.changeRate.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
  ngOnInit() {
    this.dataservice.getConversionRate().subscribe((currencyjosn)=>{
      // console.log(currencyjosn);
      this.currencies=currencyjosn;
    });
  }
}
