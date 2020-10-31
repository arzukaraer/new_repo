import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  constructor(private http: HttpClient) { }

  getHighstockChart(ticker) {
    return this.http.get(`http://localhost:3000/highChartsHistory/${ticker}`);
  }
}
