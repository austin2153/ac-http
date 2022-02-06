import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from '../common/global-constants'

@Injectable({
  providedIn: 'root'
})
export class VraService {

  constructor(private http: HttpClient) { }

  // get bearer token
  getToken(): Observable < any > {
    const vraURL = GlobalConstants.vraURL;
    const login = {
      "username": '',
      "password": ''
    };

    // headers
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

    // search params
    let params = new HttpParams();
    params = params.append('access_token', '');

    return this.http.post<any>(vraURL+'csp/gateway/am/api/login', JSON.stringify(login),
      {
        headers: headers,
        params: params,
        observe: 'response'
      });
  }

  // get vra deployments
  getDeployments(): Observable<any> {

    const vraURL = GlobalConstants.vraURL;
    const token = GlobalConstants.bearerToken;
    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + token)
    .set('Access-Control-Allow-Origin', '*')
    
    return this.http.get<any>(vraURL+'deployment/api/deployments',
    {
      headers: headers
    })
  }

}

