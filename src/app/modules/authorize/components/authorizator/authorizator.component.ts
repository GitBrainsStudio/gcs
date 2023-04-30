import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { Settings } from 'src/app/core/settings/models/settings';
import { SettingsSerivce } from 'src/app/core/settings/services/settings.service';

@Component({
  selector: 'app-authorizator',
  templateUrl: './authorizator.component.html',
  styleUrls: ['./authorizator.component.scss']
})
export class AuthorizatorComponent implements OnInit {
  constructor(
    public settingsService: SettingsSerivce,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.redirectUrl = params['redirect'];
    });
  }

  redirectUrl: string = '';
  form = this.formBuilder.group({
    Email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    Password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });
  formLoading: boolean = false;

  formSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;
    this.form.disable();

    this.authenticationService
      .authenticate(this.form.getRawValue())
      .pipe(
        delay(3000),
        finalize(() => {
          this.formLoading = false;
          this.form.enable();
        })
      )
      .subscribe({
        next: v => {
          this.router.navigate([this.redirectUrl ? this.redirectUrl : '']);
        },
        error: e => {
          this.matSnackBar.open(
            e?.error?.message ? e.error.message : Settings.InternalErrorMessage,
            undefined,
            {
              verticalPosition: 'bottom',
              duration: 3000
            }
          );
        }
      });
  }
}
