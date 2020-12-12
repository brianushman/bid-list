import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BidResolverService } from './services/bid-resolver.service';

const routes: Routes = [{ path: '', component: AppComponent, resolve: {
    bids: BidResolverService
  } 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BidResolverService]
})
export class AppRoutingModule { }
