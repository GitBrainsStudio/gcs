import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-header-profile-info',
  templateUrl: './header-profile-info.component.html',
  styleUrls: ['./header-profile-info.component.scss']
})
export class HeaderProfileInfoComponent {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authorize']);
  }
}
