import { Observable, timer} from 'rxjs';
import { Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';


@Injectable()
export class NavResolver implements Resolve<Observable<any>> {

  constructor() {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<number> {
   return null;
   }
}