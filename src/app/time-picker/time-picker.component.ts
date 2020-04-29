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
  hhMmSsAM: any = [
    /[0-1]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
    " ",
    /[a|p]/,
    "m",
  ];
  hhMmAM: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, " ", /[a|p]/, "m"];
  hhAM: any = [/[0-1]/, /[0-9]/, " ", /[a|p]/, "m"];

  @ViewChild("input") input: ElementRef<HTMLInputElement>;

  @Input() min: number = null;
  @Input() max: number = null;

  userQuestionUpdate = new Subject<string>();

  // value: string = "";
  private _value: string = "00:00:00 am";
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    if (this._value) {
      debugger;
      const old = this._value;
      // v = old.charAt(9) = "a";
      // const typeIndex = old.charAt(9);
      // const newType = typeIndex;

      // let newValue = newType.toString();
      // if (newValue === "0") {

      //   newValue = "a";
      // }
      // const type =  newValue ;
      //   v = type;
    }
    this._value = v;
  }

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
          // guide: true,
          showMask: false,
          mask: this.HhMmSs,
          keepCharPositions: true,
        };
        this.value = "00:00:00";
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
      case "hhMmSsAM":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhMmSsAM,
          keepCharPositions: true,
          // modelClean: true,
          placeholderChar: "0",
        };
        this.value = "00:00:00 am";
        break;
      case "hhMmAM":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhMmAM,
          keepCharPositions: true,
        };
        this.value = "00:00 am";
        break;
      case "hhAM":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhAM,
          keepCharPositions: true,
        };
        this.value = "00 am";
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
        secondChar === "" ||
        this.value.charAt(1) >= "4" ||
        this.cursorPosition < 3
      ) {
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
    const index9 = this.value.charAt(8);
    const index10 = this.value.charAt(9);
    const index11 = this.value.charAt(10);

    // up key
    if (event.keyCode === 38) {
      // hour
      if (this.cursorPosition <= 2) {
        const hourIndex = index1 + index2;
        const newHour = +hourIndex + 1;
        newValue = newHour.toString();
        if (
          this.timeType.mask === this.hhMmSs ||
          this.timeType.mask === this.hhMm ||
          this.timeType.mask === this.hh ||
          this.timeType.mask === this.hhMmSsAM ||
          this.timeType.mask === this.hhMmAM ||
          this.timeType.mask === this.hhAM
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
          index3 +
          index4 +
          index5 +
          index6 +
          index7 +
          index8 +
          index9 +
          index10 +
          index11;
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
        const afterHourIndex =
          index6 + index7 + index8 + index9 + index10 + index11;
        const minute = beforeHourIndex + newValue.toString() + afterHourIndex;
        this.value = minute;
      }

      // second
      if (this.cursorPosition >= 6 && this.cursorPosition <= 8) {
        const secondIndex = index7 + index8;
        const newSecond = +secondIndex + 1;

        newValue = newSecond.toString();
        if (parseInt(newValue) > 59) {
          newValue = "00";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        } else {
          newValue;
        }
        const beforeHourIndex =
          index1 + index2 + index3 + index4 + index5 + index6;
        const afterHourIndex = index9 + index10 + index11;
        const second = beforeHourIndex + newValue.toString() + afterHourIndex;
        this.value = second;
      }

      // type
      if (this.cursorPosition > 8) {
        const typeIndex = index10;
        const newType = typeIndex;

        newValue = newType.toString();
        const beforeHourIndex =
          index1 +
          index2 +
          index3 +
          index4 +
          index5 +
          index6 +
          index7 +
          index8 +
          index9;
        const afterHourIndex = index11;

        if (index10 === "p") {
          newValue = "a";
        } else if (index10 === "a") {
          newValue = "p";
        }

        const type = beforeHourIndex + newValue + afterHourIndex;
        this.value = type;
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
          this.timeType.mask === this.hhMmSs ||
          this.timeType.mask === this.hhMm ||
          this.timeType.mask === this.hh ||
          this.timeType.mask === this.hhMmSsAM ||
          this.timeType.mask === this.hhMmAM ||
          this.timeType.mask === this.hhAM
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
          index3 +
          index4 +
          index5 +
          index6 +
          index7 +
          index8 +
          index9 +
          index10 +
          index11;
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
        const afterHourIndex =
          index6 + index7 + index8 + index9 + index10 + index11;
        const minute = beforeHourIndex + newValue.toString() + afterHourIndex;
        this.value = minute;
      }

      // second
      if (this.cursorPosition >= 6 && this.cursorPosition <= 8) {
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
        const afterHourIndex = index9 + index10 + index11;
        const second = beforeHourIndex + newValue.toString() + afterHourIndex;
        this.value = second;
      }

      // type
      if (this.cursorPosition > 8) {
        const typeIndex = index10;
        const newType = typeIndex;

        newValue = newType.toString();
        const beforeHourIndex =
          index1 +
          index2 +
          index3 +
          index4 +
          index5 +
          index6 +
          index7 +
          index8 +
          index9;
        const afterHourIndex = index11;
        if (
          this.timeType.timeType === this.hhMmSsAM ||
          this.timeType.timeType === this.hhMmAM ||
          this.timeType.timeType === this.hhAM
        ) {
        }
        if (index10 === "p") {
          newValue = "a";
        } else if (index10 === "a") {
          newValue = "p";
        }

        const type = beforeHourIndex + newValue + afterHourIndex;
        this.value = type;
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
