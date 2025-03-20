import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('loggedInUser') ; 
  const router = new Router();

  if (isLoggedIn) {
    console.log(isLoggedIn) 
    return true;
  } else {
    // router.navigate(['/login']);
    // alert("you should login first")
    router.navigate(['/login'], { queryParams: { alert: 'true' } });

    return false;  }

};
