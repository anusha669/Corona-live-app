import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  baseUrl = "https://corona.lmao.ninja/";
  constructor(private http:HttpClient) { }

  getAllInfo():Observable<any>{
    console.log(this.baseUrl+'all');
    return this.http.get(this.baseUrl+'v2/all');
  }
  getCountryInfo(country):Observable<any>
  {
    let url = `${this.baseUrl}v2/countries/${country}`;
    console.log(url);
    return this.http.get(url);
  }

  getHistoricalData()
  {
    let url = `${this.baseUrl}v3/covid-19/historical`;
    return this.http.get(url);
  }

}
