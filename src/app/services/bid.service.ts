import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Bid } from '../models/bid.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http:HttpClient) { }

  public getBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${environment.webApiUrl}api/Bid`);
  }
}
