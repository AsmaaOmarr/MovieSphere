import { Component, Injectable, type OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // ✅ تأكد من كتابة الاسم بشكل صحيح
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers:[
    UserService,

  ]
})
export class ProfileComponent implements OnInit   {

  userData: any = {}; // تخزين بيانات المستخدم
  dynamicKeys: string[] = []; // تخزين الخصائص الديناميكية

  userForm: FormGroup;
  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      phoneNumber: new FormControl(''),
      age: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userService.loadUserInfo().subscribe({
      next: (data) => {
        if (data) {
          this.userData = data;
          this.userForm.patchValue(data);
          console.log(this.userData);
        }
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value; // جلب كل بيانات الفورم
      this.userService.addUser(userData).subscribe({
        next: (data) => {
          console.log('تم إرسال البيانات بنجاح:', data);
          alert('تم الحفظ بنجاح! ✅');
        },
        error: (err) => {
          console.error('خطأ أثناء إرسال البيانات:', err);
          alert('حدث خطأ أثناء الحفظ! ❌');
        }
      });
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة! ⚠️');
    }
  }
}

