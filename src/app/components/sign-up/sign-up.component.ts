import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import validateForm from 'src/app/helper/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  imageSrc = 'assets/images/illustrationMan-01.png'
  fbIcon = 'assets/images/fbIcon.png'
  google = 'assets/images/google.png'
  github = 'assets/images/github.png'
  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  HideShowPass(){
    this.isText = !this.isText;
    // this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    // this.isText ? this.type = "text" : this.type = "password"
    if (this.isText === true) {
      this.eyeIcon = "fa-eye";
      this.type = "text";
    }
    else {
      this.eyeIcon = "fa-eye-slash";
      this.type = "password";
    }
  }
  onsignUp() {
    debugger
    if (this.signupForm.valid) {
      // console.log(this.signupForm.value)
      // //send the object to database
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res=>{
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          alert(err?.error.message)
        }),
      })
    }
    else {
      //through the error using toastor or with the required fields
      validateForm.validateForms(this.signupForm);
    }
  }
}
