import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'num-box-app';
  min;
  max = 2;
  // mask3 = {
  //   guide: false,
  //   showMask: false,
  //   mask: [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, /[0-5]/, /[0-9]/]
  // };
}
