import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { FormModule } from '../form/form.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [ProfileComponent, ProfileEditorComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
