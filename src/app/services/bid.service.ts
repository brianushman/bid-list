import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Bid } from '../models/bid.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  isAdmin: boolean = false;

  constructor(private http:HttpClient) { }

  public isAdminUser(): boolean {
    return this.isAdmin;
  }

  public setAdminUser(admin: boolean) {
    this.isAdmin = admin;
  }

  public UserLogin(username: string, password: string) {
    return this.http.get(`${environment.webApiUrl}api/Authentication?user=${username}&password=${password}`);
  }

  public getBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${environment.webApiUrl}api/Bid`);
  }

  public createBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(`${environment.webApiUrl}api/Bid`, bid);
  }

  public deleteBid(id: number): Observable<Bid> {
    return this.http.delete<Bid>(`${environment.webApiUrl}api/Bid/${id}`);
  }
}
