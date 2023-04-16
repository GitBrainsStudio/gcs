import { Component } from '@angular/core';
import { SettingsSerivce } from 'src/app/core/settings/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public settingsService: SettingsSerivce) {}
}
