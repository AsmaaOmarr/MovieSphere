import { Component, Injectable, type OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  showAlert: boolean = false;
  profileImage: string | ArrayBuffer | null =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
  alertMessage: string = 'default';
  alertColor: string = 'success';
  name: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    //  Load from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.userForm.patchValue(userData);
      this.name = userData.username;
      if (userData.profileImage) {
        this.profileImage = userData.profileImage;
      }
    }
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.authService.fetchUserData().subscribe({
      next: (response) => {
        console.log(response);
        this.userForm.patchValue(response);
        if (response.profileImage) {
          this.profileImage = response.profileImage;
        }
        // Store updated data in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(response));
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }
  // Initialize Form
  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isSubscribed: [false],
      profileImage: [''],
    });
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.userForm.patchValue({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.showAlert = true;
      this.alertMessage = 'Please fill all required fields correctly 👀👀';
      this.alertColor = 'danger';
      setTimeout(() => {
        this.showAlert = false;
      }, 6000);
      // alert('Please fill all required fields correctly.');
      return;
    }
    const userId = this.authService.getLoggedInUserId();
    if (userId === null || userId == undefined) {
      alert('User not found.');
      return;
    }
    const updatedUser = { ...this.userForm.value };
    console.log(updatedUser);
    // Update User Data in JSON Server
    this.authService.updateUserData(updatedUser).subscribe({
      next: (response: any) => {
        //update in localStorage
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ ...updatedUser, id: userId })
        );
        this.showAlert = true;
        this.alertMessage = 'Profile updated successfully ✅✅';
        this.alertColor = 'success';
        setTimeout(() => {
          this.showAlert = false;
        }, 6000);
      },
      error: (error: any) => {
        console.error('Error updating user:', error);
        this.showAlert = true;
        this.alertMessage = 'Error updating date try again later 😥😥';
        this.alertColor = 'error';
        setTimeout(() => {
          this.showAlert = false;
        }, 6000);
      },
    });
  }
}
