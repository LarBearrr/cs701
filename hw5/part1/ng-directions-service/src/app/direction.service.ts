import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DirectionService {

  key = 'oA9LKYRMPNkJvK1BhwJl0jXbpnBGEACw';

  constructor(private http: HttpClient) { }

  getDirections(from, to): Observable <object> {
    return this.http.get(`http://open.mapquestapi.com/directions/v2/route?key=${this.key}&from=${from}&to=${to}`);
  }
}
