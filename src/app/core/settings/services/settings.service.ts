import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable({ providedIn: 'root' })
export class SettingsSerivce {
  get applicationTitle(): string {
    return Settings.ApplicationTitle;
  }
}
