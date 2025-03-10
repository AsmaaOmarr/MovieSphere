import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient, private router: Router) {}
  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
  getLoggedInUser(): { username: string; email: string } | null {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      return { username: parsedUser.username, email: parsedUser.email }; // 🔹 إرجاع فقط الاسم والبريد
    }
    return null;
  }
  
}
