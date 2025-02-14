import { Component, inject, OnInit } from '@angular/core';
import { LogOut, LucideAngularModule, X } from 'lucide-angular';
import { AuthUserUseCaseService } from '../../../../auth/application/user/auth-user-use-case.service';

@Component({
  selector: 'app-log-out-button',
  templateUrl: './log-out-button.component.html',
  styleUrls: ['./log-out-button.component.css'],
  imports: [LucideAngularModule],
  standalone: true,
})
export class LogOutButtonComponent {
  authService = inject(AuthUserUseCaseService);

  readonly LogOutIcon = LogOut;
  readonly CancelIcon = X;

  logout() {
    this.authService.logout();
    // reload the page
    window.location.reload();
  }
}
