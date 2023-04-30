import { trigger, transition, style, animate } from '@angular/animations';

export const FADE_IN_OUT_ANIMATION_TRIGGER = trigger('fadeInOutAnimated', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('200ms', style({ opacity: '1' }))
  ]),
  transition(':leave', [
    style({ opacity: '1' }),
    animate('200ms', style({ opacity: '0' }))
  ])
]);
