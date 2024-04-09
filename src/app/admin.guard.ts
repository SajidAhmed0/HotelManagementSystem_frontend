import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { StorageService } from './storage.service';

 class PermissionsService {
  constructor(private router: Router){}
  canActivate(): true | UrlTree {
    return this.authenticateOrRedirect();
  }

  private authenticateOrRedirect(){
    if(StorageService.isAdminLoggedIn()){
      return true;
    }else{
      // this.router.navigateByUrl('/signin');
      return this.router.parseUrl('/signin');
    }
  }

}

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return new PermissionsService(router).canActivate();
};
