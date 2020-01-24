import { Component } from '@angular/core';
import { Creds } from '../state/auth.service';
import { AuthService } from '../state/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitted)="onSubmit($event)">
    </bc-login-form>
  `
})
export class LoginPageComponent {
  constructor(private authService: AuthService) {}

  onSubmit(creds: Creds) {
    this.authService.login(creds).subscribe();
  }
}
