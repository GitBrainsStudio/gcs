import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, finalize } from 'rxjs';
import { Settings } from 'src/app/core/settings/models/settings';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  @Input() isLoading: boolean = true;
  @Output() isLoadingChanged = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoadingChanged.next(this.isLoading);
    this.form.disable();

    this.profileService
      .getCurrentProfile()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
          this.form.enable();
        })
      )
      .subscribe({
        next: v => {
          this.form.patchValue(v);
        },
        error: e => {}
      });
  }

  form = this.formBuilder.group({
    Id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    Email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    FirstName: new FormControl('', {
      nonNullable: true
    }),
    LastName: new FormControl('', {
      nonNullable: true
    }),
    MiddleName: new FormControl('', {
      nonNullable: true
    })
  });
  formLoading: boolean = false;

  formSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoadingChanged.next(this.isLoading);
    this.form.disable();

    this.profileService
      .update(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isLoadingChanged.next(this.isLoading);
          this.form.enable();
        })
      )
      .subscribe({
        next: v => {
          this.matSnackBar.open(
            Settings.ProfileUpdateSuccessSnackbarMessage,
            undefined,
            {
              verticalPosition: 'bottom',
              duration: 3000
            }
          );
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
