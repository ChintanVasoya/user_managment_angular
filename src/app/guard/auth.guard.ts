import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantserviceService } from '../services/constantservice.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(public constant: ConstantserviceService, public router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let flag = localStorage.getItem(this.constant.IS_LOGIN);
    if (flag == 'yes') {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false
    }

  }

}
