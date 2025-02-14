import { Component, inject } from '@angular/core';
import { AuthUserUseCaseService } from '../../../auth/application/user/auth-user-use-case.service';
import { LogOut, LucideAngularModule, Menu, Settings } from 'lucide-angular';
import { LogOutButtonComponent } from './log-out-button/log-out-button.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [
    LucideAngularModule,
    LogOutButtonComponent,
    ProfileInfoComponent,
    MenuItemsComponent,
    RouterOutlet,
  ],
})
export class SidebarComponent {
  readonly SettingsIcon = Settings;
  readonly MenuIcon = Menu;
}
