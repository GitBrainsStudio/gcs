import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input() title: string = '';
  @Input() progressBarEnabled: boolean = false;
  @Input() contentCentered: boolean = false;
  @Input() h100: boolean = false;
}
