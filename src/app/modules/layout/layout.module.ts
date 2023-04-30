import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderProfileInfoComponent } from './components/header-profile-info/header-profile-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HeaderProfileInfoComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, MainComponent, FooterComponent]
})
export class LayoutModule {}
