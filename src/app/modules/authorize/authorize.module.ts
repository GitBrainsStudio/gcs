import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './pages/authorize/authorize.component';
import { AuthorizeRoutingModule } from './authorize-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { AuthorizatorComponent } from './components/authorizator/authorizator.component';
import { MaterialModule } from '../material/material.module';
import { FormModule } from '../form/form.module';
import { WrapperModule } from '../wrapper/wrapper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthorizeComponent, AuthorizatorComponent],
  imports: [
    CommonModule,
    AuthorizeRoutingModule,
    LayoutModule,
    MaterialModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    WrapperModule
  ],
  exports: [AuthorizeComponent]
})
export class AuthorizeModule {}
