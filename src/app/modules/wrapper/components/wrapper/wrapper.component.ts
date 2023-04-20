import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  @Input() padding: number = 10;
  @Input() marginTop: number = 0;
  @Input() textAlign: string = 'left';
  @Input() overflow: string = 'auto';
}
