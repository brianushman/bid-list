import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Bid } from '../models/bid.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private authenticatedCookieName: string = 'bid-list-authenticated';
  isAdmin: boolean = false;

  constructor(
    private http:HttpClient,
    private cookieService: CookieService) {
      if(this.getCookie()) this.isAdmin = true;
    }

  public isAdminUser(): boolean {
    return this.isAdmin;
  }

  public setAdminUser(admin: boolean) {
    this.isAdmin = admin;
    if(this.isAdmin) 
      this.setCookie(true)
    else 
      this.deleteCookie();
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

  public getCookie(): any {
    return this.cookieService.get(this.authenticatedCookieName);
  }

  public setCookie(value: any) {
    if(!environment.production) {
      this.cookieService.set(this.authenticatedCookieName, value, 30, "/", 'localhost', false, "Lax");
    }
    else {
      this.cookieService.set(
        this.authenticatedCookieName, 
        value, 
        100000,
        '/',
        'bids.ctmechanical.com',
        true,
        'Strict');
    }
  }

  public deleteCookie(): void {
    this.cookieService.delete(this.authenticatedCookieName);
  }
}
