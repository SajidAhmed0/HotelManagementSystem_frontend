import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from './storage.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = StorageService.getToken(); // you probably want to store it in localStorage or something
      console.log(token);
      
      if (!token) {
        return next(req);
      }
  
      const req1 = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
  
      return next(req1);
};
