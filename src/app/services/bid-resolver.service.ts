import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Bid } from '../models/bid.model';
import { BidService } from './bid.service';

@Injectable({
  providedIn: 'root'
})
export class BidResolverService implements Resolve<Bid[]> {

  constructor(private bidService: BidService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bid[]> {
    return this.bidService.getBids();
  }
}
