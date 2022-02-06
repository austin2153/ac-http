import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VraService {

  constructor(private http: HttpClient) { }

  getToken(): Observable < any > {
    const login = {
      "username": '',
      "password": ''
    };

    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
 
    return this.http.post < any > (
      'https://{{vra-server}}/csp/gateway/am/api/login?access_token', JSON.stringify(login),
      {
        headers: headers
      })
  }
  }

