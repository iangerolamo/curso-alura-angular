import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";

@Component({
  templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    })
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  Validate(name: string): boolean {
    const nameHasError = this.loginForm.get(name)?.hasError('required')
    if (nameHasError) { return nameHasError} else { return false }
  }

  login() {

    // @ts-ignore
    const userName = this.loginForm.get('userName').value;
    // @ts-ignore
    const password = this.loginForm.get('password').value;

    this.authService
      .authenticate(userName, password)
      .subscribe({
        next: () => console.log('autenticado'),
        error: (err) => {
          console.log(err);
          this.loginForm.reset();
        }
      });

  }

}
