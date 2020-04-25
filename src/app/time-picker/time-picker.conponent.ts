import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-time-picker",
  templateUrl: "time-picker.component.html",
})
export class TimePickerComponent implements OnInit {
  timeMask = [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];

  @ViewChild("input") input: ElementRef<HTMLInputElement>;

  @Input() min: number = null;
  @Input() max: number = null;

  userQuestionUpdate = new Subject<string>();

  value: string = "";

  tmp: any;

  count: number;

  findColon: boolean = false;
  findMinus: boolean = false;

  cursorPosition: number = 0;

  ColonPosition;

  @Input() intStep: number = 1;
  constructor() {}

  ngOnInit() {}

  handleKeyPress(event: any) {
    const pattern = /^[0-9\:]$/g;

    const inputChar = String.fromCharCode(event.charCode);
    const firstChar = this.value.charAt(this.value.length - 8);
    const secondChar = this.value.charAt(this.value.length - 7);

    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      if (firstChar === "2") {
        if (secondChar === "_") {
          if (inputChar >= "4") {
            event.preventDefault();
          }
        }
      }
    }
  }
}
