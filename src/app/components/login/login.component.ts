import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helper/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  imageSrc = 'assets/images/illustrationMan-01.png'
  fbIcon = 'assets/images/fbIcon.png'
  google = 'assets/images/google.png'
  github = 'assets/images/github.png'
  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  HideShowPass() {
    this.isText = !this.isText;
    // this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    // this.isText ? this.type = "text" : this.type = "password"
    if (this.isText === true) {
      debugger
      this.eyeIcon = "fa-eye";
      this.type = "text";
    }
    else {
      this.eyeIcon = "fa-eye-slash";
      this.type = "password";
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value)
      // //send the object to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.loginForm.reset();
          this.router.navigate(['Dashboard']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else {
      //through the error using toastor or with the required fields
      validateForm.validateForms(this.loginForm);
    }
  }
}
