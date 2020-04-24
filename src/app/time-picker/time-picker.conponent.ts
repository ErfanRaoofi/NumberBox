import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-time-picker",
  templateUrl: "time-picker.component.html",
})
export class TimePickerComponent implements OnInit {
  @ViewChild("input") input: ElementRef<HTMLInputElement>;

  @Input() min: number = null;
  @Input() max: number = null;

  userQuestionUpdate = new Subject<string>();

  value: string = "";

  tmp: any;

  count: number;

  findDots: boolean = false;
  findMinus: boolean = false;

  cursorPosition: number = 0;

  dotPosition;

  @Input() floatCount: number = 2;
  @Input() intStep: number = 1;
  @Input() floatStep: number = 0.1;
  constructor() {}

  ngOnInit() {}

  handleKeyPress(event: any) {
    const pattern = /[0-9\:]/g;
    const pat = /[0-9\-]/g;

    const inputChar = String.fromCharCode(event.charCode);

    if (this.value.match(/\:/g) === null) {
      this.findDots = false;
    }
    if (this.value.search("-") === null) {
      this.findMinus = false;
    }
    if (this.cursorPosition !== 0) {
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      } else {
        if (inputChar === ":") {
          const lastChar = this.value.charAt(this.value.length - 1);
          if (lastChar.match(/\-/g)) {
            event.preventDefault();
          }
          if (this.findDots) {
            event.preventDefault();
          }
          this.findDots = true;
          this.findMinus = true;
        }
      }

      if (inputChar === "-") {
        if (this.findMinus) {
          event.preventDefault();
        }
        this.findMinus = true;
      }
    }
  }
}
