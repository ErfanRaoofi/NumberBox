import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-time-picker",
  templateUrl: "time-picker.component.html",
})
export class TimePickerComponent implements OnInit, AfterViewInit {
  @Input()
  timeType: any;

  HhMmSs: any = [
    /[0-2]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
  ];
  HhMm: any = [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  Hh: any = [/[0-2]/, /[0-9]/];
  hhMmSs: any = [
    /[0-1]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
  ];
  hhMm: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  hh: any = [/[0-1]/, /[0-9]/];

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
    switch (this.timeType) {
      case "HhMmSs":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.HhMmSs,
        };
        break;
      case "HhMm":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.HhMm,
        };
        break;
      case "Hh":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.Hh,
        };
        break;
      case "hhMmSs":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.hhMmSs,
        };
        break;
      case "hhMm":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.hhMm,
        };
        break;
      case "hh":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.hh,
        };
        break;

      default:
    }
  }

  handleKeyPress(event: any) {
    const pattern = /^[0-9\:]$/g;

    const inputChar = String.fromCharCode(event.charCode);
    const firstChar = this.value.charAt(0);
    const secondChar = this.value.charAt(1);

    if (
      this.input.nativeElement.selectionStart ||
      this.input.nativeElement.selectionStart === 0
    ) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
      this.cursorPosition += 1;
    }

    // if (event.keyCode !== 8 && !pattern.test(inputChar)) {
    //   event.preventDefault();
    // } else {
    if (firstChar === "2") {
      if (
        secondChar === "" || this.value.charAt(1) >= "4" ||  this.cursorPosition < 3) {
        if (inputChar >= "4") {
          event.preventDefault();
        }
      }
      // }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.which === 38 || event.which === 40) {
      document.getElementById("timePickerValue").style.caretColor = "black";
      event.preventDefault();
      event.stopPropagation();
    }
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

    // up key
    if (event.keyCode === 38) {
      // hour
      if (this.cursorPosition <= 2) {
        const hourIndex = index1 + index2;
        const newHour = +hourIndex + 1;
        newValue = newHour.toString();
        if (
          this.timeType.timeType === this.hhMmSs ||
          this.timeType.timeType === this.hhMm ||
          this.timeType.timeType === this.hh
        ) {
          if (parseInt(newValue) > 12) {
            newValue = "01";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          } else {
            newValue;
          }
        } else {
          if (parseInt(newValue) > 23) {
            newValue = "00";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          } else {
            newValue;
          }
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
        const beforeHourIndex =
          index1 + index2 + index3 + index4 + index5 + index6;
        const second = beforeHourIndex + newValue.toString();
        this.value = second;
      }
    }

    // key down
    if (event.keyCode === 40) {
      // hour
      if (this.cursorPosition <= 2) {
        const hourIndex = index1 + index2;
        const newHour = +hourIndex - 1;

        newValue = newHour.toString();
        if (
          this.timeType.timeType === this.hhMmSs ||
          this.timeType.timeType === this.hhMm ||
          this.timeType.timeType === this.hh
        ) {
          if (parseInt(newValue) < 1) {
            newValue = "12";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          } else {
            newValue;
          }
        } else {
          if (parseInt(newValue) < 0) {
            newValue = "23";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          } else {
            newValue;
          }
        }
        const afterHourIndex =
          index3 + index4 + index5 + index6 + index7 + index8;
        const hour = newValue.toString() + afterHourIndex;
        this.value = hour;
      }
      // minute
      if (this.cursorPosition >= 3 && this.cursorPosition <= 5) {
        const hourIndex = index4 + index5;
        const newHour = +hourIndex - 1;

        newValue = newHour.toString();
        if (parseInt(newValue) < 0) {
          newValue = "59";
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
        const newHour = +hourIndex - 1;

        newValue = newHour.toString();
        if (parseInt(newValue) < 0) {
          newValue = "59";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        } else {
          newValue;
        }
        const beforeHourIndex =
          index1 + index2 + index3 + index4 + index5 + index6;
        const second = beforeHourIndex + newValue.toString();
        this.value = second;
      }
    }

    if (event.which === 38 || event.which === 40) {
      document.getElementById("timePickerValue").style.caretColor = "#ffffffff";
      event.preventDefault();
      event.stopPropagation();
      return false;
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
    const getElement = document.getElementById("timePickerValue");
    this.setCaretPosition(getElement, this.cursorPosition);
  }
}
