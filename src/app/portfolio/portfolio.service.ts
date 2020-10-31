import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }
  getPortfolioTickers(key_ticker){
    console.log("printing the key");
    console.log(key_ticker);
    var token="d0015fbdf2f9b4b87837a2afc92897d3a586f838";
    console.log(this.http.get(`http://localhost:3000/search/${key_ticker}`));
   return this.http.get(`http://localhost:3000/search/${key_ticker}`)
 
}
}
