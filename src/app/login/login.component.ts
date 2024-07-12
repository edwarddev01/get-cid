import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadingService } from '../services/loading.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private loginService: LoginService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/),
      ]),
      recaptchaToken: new FormControl('', [Validators.required]),
    });
  }
  onSubmitLogin() {
    if (this.formLogin.valid) {
      this.loading.show();
      this.loginService.login(this.formLogin.value).subscribe(
        (response) => {
          if (response && response.status == 'ok') {
            this.toast.success(`${response.message}`, 'Success');
            this.router.navigate(['/home']);
          }
          this.loading.hide();
        },
        (error) => {
          console.log('Error login ', error);
          this.loading.hide();
          this.toast.error(`${error.error.message}`, 'Unauthorized');
        }
      );
    }
  }
}
