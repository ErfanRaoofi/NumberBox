import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";

// export type AXTimeType = "hh:ss" | "HH:SS";
// export interface AXTimeTypeComp {
//   mask: AXTimeType;
// }

@Component({
  selector: "app-time-picker",
  templateUrl: "time-picker.component.html",
})
export class TimePickerComponent implements OnInit, AfterViewInit {
  @Input()
  mask: any;

  @Input() timeMask = [
    /[0-2]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
  ];

  HhmSs: any = [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  HhMm: any = [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  hhMm: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];

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
  ngAfterViewInit(): void {
    switch (this.mask) {
      case "HhmSs":
        this.mask = this.HhmSs;
        this.mask = {
          guide: false,
          showMask: false,
          mask: this.HhmSs,
        };
        break;
      case "HhMm":
        this.mask = this.HhMm;
        this.mask = {
          guide: false,
          showMask: false,
          mask: this.HhMm,
        };
        break;
      case "hhMm":
        this.mask = this.hhMm;
        this.mask = {
          guide: false,
          showMask: false,
          mask: this.hhMm,
        };
        break;

      default:
    }
  }

  handleKeyPress(event: any) {
    const pattern = /^[0-9\:]$/g;
    // ^([0-1][0-9]|2[0-3]):[0-5][0-9]$
    const inputChar = String.fromCharCode(event.charCode);
    const firstChar = this.value.charAt(this.value.length - 1);
    const secondChar = this.value.charAt(1);

    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      if (firstChar === "2") {
        if (secondChar === "") {
          if (inputChar >= "4") {
            event.preventDefault();
          }
        }
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    // up & down button
    if (event.keyCode === 38) {
      this.setCaret();
    }
    if (event.keyCode === 40) {
      this.setCaret();
    }
    if (event.which === 38 || event.which === 40) {
      event.preventDefault();
      return false;
    }

    // left & right Button
    if (event.keyCode === 37 || event.keyCode === 39) {
      if (
        this.input.nativeElement.selectionStart ||
        this.input.nativeElement.selectionStart === 0
      ) {
        this.cursorPosition = this.input.nativeElement.selectionStart;
      }
    }

    // home button
    if (event.keyCode === 36) {
      this.cursorPosition = 0;
    }

    // end button
    if (event.keyCode === 35) {
      this.cursorPosition = this.value.length;
    }

    // backspace Control
    if (event.keyCode === 8) {
      if (this.value.length <= 0) {
        this.cursorPosition = 0;
      } else {
        this.cursorPosition -= 1;
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    let newValue = this.value;

    const index1 = newValue.charAt(0);
    const index2 = newValue.charAt(1);
    const index3 = this.value.charAt(2);
    const index4 = this.value.charAt(3);
    const index5 = this.value.charAt(4);
    const index6 = this.value.charAt(5);
    const index7 = this.value.charAt(6);
    const index8 = this.value.charAt(7);

    if (event.keyCode === 38) {
      if (this.cursorPosition <= 2) {
        const hourIndex = index1 + index2;
        const newHour = +hourIndex + 1;

        newValue = newHour.toString();
        if (parseInt(newValue) > 23) {
          newValue = "00";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        } else {
          newValue;
        }
        const afterHourIndex =
          index3 + index4 + index5 + index6 + index7 + index8;
        const hour = newValue.toString() + afterHourIndex;
        this.value = hour;
      }
      // minute
      if (this.cursorPosition >= 3 && this.cursorPosition <= 5) {
        const hourIndex = index4 + index5;
        const newHour = +hourIndex + 1;

        newValue = newHour.toString();
        if (parseInt(newValue) > 59) {
          newValue = "00";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        } else {
          newValue;
        }
        const beforeHourIndex = index1 + index2 + index3;
        const afterHourIndex = index6 + index7 + index8;
        const minute = beforeHourIndex + newValue.toString() + afterHourIndex;
        this.value = minute;
      }

      // second
      if (this.cursorPosition >= 6) {
        const hourIndex = index7 + index8;
        const newHour = +hourIndex + 1;

        newValue = newHour.toString();
        if (parseInt(newValue) > 59) {
          newValue = "00";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        } else {
          newValue;
        }
        const beforeHourIndex = index1 + index2 + index3 + index4 + index5 + index6;
        const second = beforeHourIndex + newValue.toString();
        this.value = second;
      }
    }
  }

  handleClick(event: KeyboardEvent) {
    if (
      this.input.nativeElement.selectionStart ||
      this.input.nativeElement.selectionStart === 0
    ) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
    }
  }

  doGetCaretPosition(ctrl) {
    let CaretPos = 0;
    if (ctrl.selectionStart || ctrl.selectionStart === 0) {
      CaretPos = ctrl.selectionStart;
      return CaretPos;
    }
  }

  setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }

  setCaret() {
    const getElement = document.getElementById("value");
    this.setCaretPosition(getElement, this.cursorPosition);
  }
}
