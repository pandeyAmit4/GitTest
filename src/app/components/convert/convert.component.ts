import { Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { NG_VALIDATORS,Validator, Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {DataService} from '../../service/data.service'
import { EventEmitter } from 'events';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['../../../../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css','./convert.component.scss']
})
export class ConvertComponent implements OnInit {
  currencies: any;
  currencyToBeChanged: number;
  currType: number;
  isDisclaimer: boolean = false;
  discMsg: string;
  regex = new RegExp("^[0-9]*\\.?[0-9]*$", "g");
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];
  
  @ViewChild('changeRate') changeRate: ElementRef;
  constructor(private dataservice: DataService) {
   }
   keys() : Array<string> {
    return Object.keys(this.currencies.rates);
  }
  setChanges(inputValue){
     this.currencyToBeChanged=inputValue;
     this.currType = (this.changeRate.nativeElement.value * this.currencyToBeChanged);
   }
   currencyTypeChanged(event){
     if(this.currencyToBeChanged){
      this.currType=(event.target.value * this.currencyToBeChanged);
     }
   }
   getDetails(event){
    this.isDisclaimer=!this.isDisclaimer; 
    let selector=this.changeRate.nativeElement;
    let text=selector.options[selector.selectedIndex].text;
    this.discMsg="Change Rate : "+this.changeRate.nativeElement.value;
    // alert("Current Change Rate for "+ text +" Is: "+this.changeRate.nativeElement.value);
   }
    @HostListener('keydown', [ '$event' ])
    onKeyDown(event) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = event.target.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
  ngOnInit() {
    this.dataservice.getConversionRate().subscribe((currencyjosn)=>{
      this.currencies=currencyjosn;
    });
  }
}
