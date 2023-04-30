import { Component, Input } from '@angular/core';
import { FADE_IN_OUT_ANIMATION_TRIGGER } from 'src/app/shared/triggers/fade-in-out-animation.trigger';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss'],
  animations: [FADE_IN_OUT_ANIMATION_TRIGGER]
})
export class LoaderSpinnerComponent {
  @Input() visible: boolean = false;
  @Input() text: string = '';
}
