import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }
  getTickers(searchTicker:string){
   var token="d0015fbdf2f9b4b87837a2afc92897d3a586f838";
  return this.http.get(`http://localhost:3000/search/${searchTicker}`)


  }

}
