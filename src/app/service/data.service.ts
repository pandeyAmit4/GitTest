import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {
  constructor(public http: Http ) {
    console.log("data service connected");
  }
  getConversionRate(){
    return this.http.get("http://data.fixer.io/api/latest?access_key=5de68d7904f8f501bb47d85c9dec718e&format=1&&symbols=CAD,USD,EUR").map(res=> res.json());
  }
}