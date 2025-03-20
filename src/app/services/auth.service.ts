import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
    const user = localStorage.getItem('loggedInUser');
    console.log('Before logout:', localStorage.getItem('loggedInUser'));

    localStorage.removeItem('loggedInUser'); // Remove user data
  
    console.log('After logout:', localStorage.getItem('loggedInUser')); // Should be null
  
    this.router.navigate(['/login']);
  
  }
  getLoggedInUser(): any | null {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      return {
        id: parsedUser.id,
        username: parsedUser.username,
        email: parsedUser.email,
        password: parsedUser.password,
        isSubscribed: parsedUser.isSubscribed,
      };
    }
    return null;
  }
  isSubscribed(): boolean {
    const user = this.getLoggedInUser();
    return user.isSubscribed;
  }

  subscribeUser() {
    const user = this.getLoggedInUser();
    console.log('User:', user);
    if (user) {
      const updatedUser = { ...user, isSubscribed: true };
      console.log('Updated user:', updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      this.http.put(`${this.apiUrl}/${user.id}`, updatedUser).subscribe({
        next: (res) => console.log('Subscription updated:', res),
        error: (err) => console.error('Error updating subscription:', err),
      });
    }
  }

  getLoggedInUserId(): number | null {
    const user = localStorage.getItem('loggedInUser');
    console.log(user);
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      console.log(parsedUser.id);
      return parsedUser.id;
    }
    return null;
  }

  // Fetch User Data from JSON Server
  fetchUserData(): Observable<any> {
    const userId = this.getLoggedInUserId();
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUserData(updatedUser: any): Observable<any> {
    const userId = this.getLoggedInUserId();
    return this.http.put(`${this.apiUrl}/${userId}`, {
      ...updatedUser,
      id: userId,
    });
  }
}
