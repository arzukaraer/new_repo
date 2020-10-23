import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private http: HttpClient
  ) { }

  getDetails() {
    return this.http.get("https://api.github.com/users/mapbox");
  }
}
