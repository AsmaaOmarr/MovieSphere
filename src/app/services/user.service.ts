import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService  {

    private apiUrl = 'http://localhost:5000/users';
    private userChangesUrl = 'http://localhost:1000/userChanges';

    constructor(private http: HttpClient) {}

    // جلب بيانات المستخدمين
    loadUserInfo(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
    
    // إرسال البيانات إلى API
    addUser(userData: any): Observable<any> {
        return this.http.post<any>(this.userChangesUrl, userData, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

