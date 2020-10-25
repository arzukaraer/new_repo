import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private http: HttpClient
  ) { }

  getDetails(ticker) {
    return this.http.get(`http://localhost:3000/search/${ticker}`);
  }
  getCompanyOutlook(ticker){
     console.log("getCompanyOutlook functioncall")
     return this.http.get(`http://localhost:3000/companyinfo/${ticker}`);

     
  }
  getTopNews(ticker){
    console.log("IN getTopNEws functioncall")
    return this.http.get(`http://localhost:3000/topNews/${ticker}`);

}
}
