import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-time-picker",
  templateUrl: "time-picker.component.html",
})
export class TimePickerComponent implements OnInit {
  @Input()
  timeType: any;

  HhMmSs: any = [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  HhMm: any = [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  Hh: any = [/[0-2]/, /[0-9]/];
  hhMmSs: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  hhMm: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  hh: any = [/[0-1]/, /[0-9]/];
  hhMmSsAM: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, " ", /[a|p]/, "m"];
  hhMmAM: any = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, " ", /[a|p]/, "m"];
  hhAM: any = [/[0-1]/, /[0-9]/, " ", /[a|p]/, "m"];

  @ViewChild("input") input: ElementRef<HTMLInputElement>;

  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    if (this._value) {
      const old = this._value;
      const ind1 = v.charAt(0);
      const ind2 = v.charAt(1);
      const ind3 = v.charAt(2);
      const ind4 = v.charAt(3);
      const ind5 = v.charAt(4);
      const ind6 = v.charAt(5);
      const ind7 = v.charAt(6);
      const ind8 = v.charAt(7);
      const ind9 = v.charAt(8);
      const ind10 = v.charAt(9);

      const indOld4 = old.charAt(9);
      const indOld7 = old.charAt(9);
      const indOld10 = old.charAt(9);

      // handle hhMsSsAm
      if (ind1 === "-" && ind2 !== "-" && this.timeType.mask === this.hhMmSsAM) {
        v = '0' + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + 'm';
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 2);
          this.cursorPosition = 2;
        }, 0);
      }
      if (ind4 === "-" && ind5 !== "-" && this.timeType.mask === this.hhMmSsAM) {
        v = ind1 + ind2 + ind3 + '0' + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + 'm';
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 5);
          this.cursorPosition = 5;
        }, 0);
      }
      if (ind7 === "-" && ind8 !== "-" && this.timeType.mask === this.hhMmSsAM) {
        v = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + '0' + ind8 + ind9 + ind10 + 'm';
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 8);
          this.cursorPosition = 8;
        }, 0);
      }
      if (indOld10 === '-' && this.timeType.mask === this.hhMmSsAM) {
        v = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + 'a' + 'm';
      }

      //
      if (ind1 === "-" && ind2 !== "-" && this.timeType.mask === this.hhMmAM) {
        v = '0' + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 +  'm';
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 2);
          this.cursorPosition = 2;
        }, 0);
      }
      if (ind4 === "-" && ind5 !== "-" && this.timeType.mask === this.hhMmAM) {
        v = ind1 + ind2 + ind3 + '0' + ind5 + ind6 + ind7 + 'm';
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 5);
          this.cursorPosition = 5;
        }, 0);
      }
      if (indOld7 === '-' && this.timeType.mask === this.hhMmAM) {
        v = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + 'a' + 'm';
      }

       //
      if (ind1 === "-" && ind2 !== "-" && this.timeType.mask === this.hhAM) {
        v = '0' + ind2 + ind3 + ind4  + 'm';
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 2);
          this.cursorPosition = 2;
        }, 0);
      }
      if (indOld4 === '-' && this.timeType.mask === this.hhAM) {
        v = ind1 + ind2 + ind3 + 'a' + 'm';
      }

      //
      if (ind1 === "-" && ind2 !== "-" && (this.timeType.mask === this.hhMmSs || this.timeType.mask === this.HhMmSs)) {
        v = '0' + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8;
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 2);
          this.cursorPosition = 2;
        }, 0);
      }
      if (ind4 === "-" && ind5 !== "-" && (this.timeType.mask === this.hhMmSs || this.timeType.mask === this.HhMmSs)) {
        v = ind1 + ind2 + ind3 + '0' + ind5 + ind6 + ind7 + ind8 ;
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 6);
          this.cursorPosition = 6;
        }, 0);
      }
      if (ind7 === "-" && ind8 !== "-" && (this.timeType.mask === this.hhMmSs || this.timeType.mask === this.HhMmSs)) {
        v = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + '0' + ind8 ;
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 9);
          this.cursorPosition = 9;
        }, 0);
      }

      //
      if (ind1 === "-" && ind2 !== "-" && (this.timeType.mask === this.hhMm || this.timeType.mask === this.HhMm)) {
        v = '0' + ind2 + ind3 + ind4 + ind5 ;
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 2);
          this.cursorPosition = 2;
        }, 0);
      }
      if (ind4 === "-" && ind5 !== "-" && (this.timeType.mask === this.hhMm || this.timeType.mask === this.HhMm)) {
        v = ind1 + ind2 + ind3 + '0' + ind5 ;
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 5);
          this.cursorPosition = 5;
        }, 0);
      }

       //
      if (ind1 === "-" && ind2 !== "-" && (this.timeType.mask === this.hh || this.timeType.mask === this.Hh)) {
        v = '0' + ind2 ;
        setTimeout(() => {
          this.setCaretPosition(this.input.nativeElement, 2);
          this.cursorPosition = 2;
        }, 0);
      }

    }
    this._value = v;
  }

  cursorPosition: number = 0;

  @Input() intStep: number = 1;
  constructor() {}

  ngOnInit(): void {
    switch (this.timeType) {
      case "HhMmSs":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.HhMmSs,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:--:--";
        break;
      case "HhMm":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.HhMm,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:--";
        break;
      case "Hh":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.Hh,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--";
        break;
      case "hhMmSs":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhMmSs,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:--:--";
        break;
      case "hhMm":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.hhMm,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:--";
        break;
      case "hh":
        this.timeType = {
          guide: false,
          showMask: false,
          mask: this.hh,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:--:--";
        break;
      case "hhMmSsAM":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhMmSsAM,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:--:-- am";
        break;
      case "hhMmAM":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhMmAM,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "--:-- am";
        break;
      case "hhAM":
        this.timeType = {
          guide: true,
          showMask: true,
          mask: this.hhAM,
          keepCharPositions: true,
          placeholderChar: "-",
        };
        this.value = "-- am";
        break;
      default:
    }
  }

  handleKeyPress(event: any) {

    const inputChar = String.fromCharCode(event.charCode);
    const firstChar = this.value.charAt(0);
    const secondChar = this.value.charAt(1);

    setTimeout(() => {
      if (
        this.input.nativeElement.selectionStart ||
        this.input.nativeElement.selectionStart === 0
      ) {
        this.cursorPosition = this.input.nativeElement.selectionStart;
        // this.cursorPosition += 1 ;
      }
    }, 0);

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
    }
    if (
      this.timeType.mask === this.hhMmSs ||
      this.timeType.mask === this.hhMm ||
      this.timeType.mask === this.hh ||
      this.timeType.mask === this.hhMmSsAM ||
      this.timeType.mask === this.hhMmAM ||
      this.timeType.mask === this.hhAM
    ) {
      if (firstChar === "1") {
        if (
          secondChar === "" ||
          this.value.charAt(1) >= "3" ||
          this.cursorPosition < 3
        ) {
          if (inputChar >= "3") {
            event.preventDefault();
          }
        }
      }
    }
    if (inputChar === "-") {
      event.preventDefault();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.which === 38 || event.which === 40) {
      this.input.nativeElement.style.caretColor = "auto";
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
      if (this.timeType.mask === this.hhMmSsAM || this.timeType.mask === this.hhMmAM || this.timeType.mask === this.hhAM) {
        if (this.timeType.mask === this.hhMmSsAM) {
          this.cursorPosition = 9;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement,  this.cursorPosition);
            this.input.nativeElement.style.caretColor = "auto";
          }, 0);
        }
        if (this.timeType.mask === this.hhMmAM) {
          this.cursorPosition = 6;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement,  this.cursorPosition);
            this.input.nativeElement.style.caretColor = "auto";
          }, 0);
        }
        if (this.timeType.mask === this.hhAM) {
          this.cursorPosition = 3;
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement,  this.cursorPosition);
            this.input.nativeElement.style.caretColor = "auto";
          }, 0);
        }
    } else {
      this.cursorPosition = this.value.length;
    }
    }

    // backspace Control
    if (event.keyCode === 8) {
      const ind1 = this.value.charAt(0);
      const ind2 = this.value.charAt(1);
      const ind3 = this.value.charAt(2);
      const ind4 = this.value.charAt(3);
      const ind5 = this.value.charAt(4);
      const ind6 = this.value.charAt(5);
      const ind7 = this.value.charAt(6);
      const ind8 = this.value.charAt(7);
      const ind9 = this.value.charAt(8);
      const ind10 = this.value.charAt(9);
      if (this.timeType.mask === this.hhMmSsAM) {
        if (ind10 === "-") {
          this.value =
            ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + "a" + "m";
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 0);
            this.cursorPosition = 0;
          }, 0);
        }
      }
      if (this.timeType.mask === this.hhMmAM) {
        if (ind7 === "-") {
          this.value = ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + "a" + "m";
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 0);
            this.cursorPosition = 0;
          }, 0);
        }
      }
      if (this.timeType.mask === this.hhAM) {
        if (ind4 === "-") {
          this.value = ind1 + ind2 + ind3 + "a" + "m";
          setTimeout(() => {
            this.setCaretPosition(this.input.nativeElement, 0);
            this.cursorPosition = 0;
          }, 0);
        }
      }

      if (this.value.length <= 0) {
        this.cursorPosition = 0;
        console.log(this.cursorPosition, "a");
      } else {
        this.cursorPosition -= 1;
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'End') {
      if (this.timeType.mask === this.hhMmSsAM || this.timeType.mask === this.hhMmAM || this.timeType.mask === this.hhAM) {
        this.input.nativeElement.style.caretColor = "transparent";

    } else {
      this.input.nativeElement.style.caretColor = "auto";
    }
  }

    let newValue = this.value;

    const ind1 = newValue.charAt(0);
    const ind2 = newValue.charAt(1);
    const ind3 = this.value.charAt(2);
    const ind4 = this.value.charAt(3);
    const ind5 = this.value.charAt(4);
    const ind6 = this.value.charAt(5);
    const ind7 = this.value.charAt(6);
    const ind8 = this.value.charAt(7);
    const ind9 = this.value.charAt(8);
    const ind10 = this.value.charAt(9);
    const ind11 = this.value.charAt(10);

    // up key
    if (event.keyCode === 38) {
      // hour
      if (this.cursorPosition <= 2) {
        const hourind = ind1 + ind2;
        const newHour = +hourind + 1;
        newValue = newHour.toString();
        if (
          this.timeType.mask === this.hhMmSs ||
          this.timeType.mask === this.hhMm ||
          this.timeType.mask === this.hh ||
          this.timeType.mask === this.hhMmSsAM ||
          this.timeType.mask === this.hhMmAM ||
          this.timeType.mask === this.hhAM
        ) {
          if (hourind === "--") {
            newValue = "0";
          }
          if (ind1 !== "-" && hourind === ind1 + "-") {
            newValue =  "0";
          }
          if (ind2 !== "-" && hourind === "-" + ind2) {
            newValue = "0";
          }
          if (parseInt(newValue) > 12) {
            newValue = "01";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          }
        } else {
          if (parseInt(newValue) > 23) {
            newValue = "00";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          }
        }
        const afterHourind =
          ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const hour = newValue.toString() + afterHourind;
        this.value = hour;
      }
      // minute
      if (this.cursorPosition >= 3 && this.cursorPosition <= 5) {
        const hourind = ind4 + ind5;
        const newHour = +hourind + 1;

        newValue = newHour.toString();
        if (hourind === "--") {
          newValue = "0";
        }
        if (ind4 !== "-" && hourind === ind4 + "-") {
          newValue = "0";
        }
        if (ind5 !== "-" && hourind === "-" + ind5) {
          newValue = "0";
        }
        if (parseInt(newValue) > 59) {
          newValue = "00";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        }
        const beforeHourind = ind1 + ind2 + ind3;
        const afterHourind = ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const minute = beforeHourind + newValue.toString() + afterHourind;
        this.value = minute;
      }

      // second
      if (this.cursorPosition >= 6 && this.cursorPosition <= 8) {
        const secondind = ind7 + ind8;
        const newSecond = +secondind + 1;

        newValue = newSecond.toString();
        if (secondind === "--") {
          newValue = "0";
        }
        if (ind7 !== "-" && secondind === ind7 + "-") {
          newValue = "0";
        }
        if (ind8 !== "-" && secondind === "-" + ind8) {
          newValue = "0";
        }
        if (parseInt(newValue) > 59) {
          newValue = "00";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        }
        const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
        const afterHourind = ind9 + ind10 + ind11;
        const second = beforeHourind + newValue.toString() + afterHourind;
        this.value = second;
      }

      // type AM/PM
      if (this.timeType.mask === this.hhMmSsAM) {
        if (this.cursorPosition > 8) {
          let typeind = ind10.toString();

          const beforeHourind =
            ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9;
          const afterHourind = ind11;

          if (ind10 === "p") {
            typeind = "a";
          } else if (ind10 === "a") {
            typeind = "p";
          }
          this.value = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hhMmAM) {
        if (this.cursorPosition >= 6) {
          let typeind = ind7.toString();

          const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
          const afterHourind = ind8;

          if (ind7 === "p") {
            typeind = "a";
          } else if (ind7 === "a") {
            typeind = "p";
          }
          this.value = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hhAM) {
        if (this.cursorPosition >= 3) {
          let typeind2 = ind4.toString();

          const beforeHourind = ind1 + ind2 + ind3;
          const afterHourind = ind5;

          if (ind4 === "p") {
            typeind2 = "a";
          } else if (ind4 === "a") {
            typeind2 = "p";
          }
          this.value = beforeHourind + typeind2 + afterHourind;
        }
      }
    }

    // key down
    if (event.keyCode === 40) {
      // hour
      if (this.cursorPosition <= 2) {
        const hourind = ind1 + ind2;
        const newHour = +hourind - 1;

        newValue = newHour.toString();
        if (
          this.timeType.mask === this.hhMmSs ||
          this.timeType.mask === this.hhMm ||
          this.timeType.mask === this.hh ||
          this.timeType.mask === this.hhMmSsAM ||
          this.timeType.mask === this.hhMmAM ||
          this.timeType.mask === this.hhAM
        ) {
          if (hourind === "--") {
            newValue = "0";
          }
          if (parseInt(newValue) < 1) {
            newValue = "12";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          }
        } else {
          if (parseInt(newValue) < 0) {
            newValue = "23";
          } else if (parseInt(newValue) < 10) {
            newValue = "0" + newValue;
          }
        }
        const afterHourIndex =
          ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const hour = newValue.toString() + afterHourIndex;
        this.value = hour;
      }
      // minute
      if (this.cursorPosition >= 3 && this.cursorPosition <= 5) {
        const minuteind = ind4 + ind5;
        const newMinute = +minuteind - 1;

        newValue = newMinute.toString();
        if (minuteind === "--") {
          newValue = "0";
        }
        if (parseInt(newValue) < 0) {
          newValue = "59";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        }
        const beforeMinuteIndex = ind1 + ind2 + ind3;
        const afterMinuteIndex = ind6 + ind7 + ind8 + ind9 + ind10 + ind11;
        const minute = beforeMinuteIndex + newValue.toString() + afterMinuteIndex;
        this.value = minute;
      }

      // second
      if (this.cursorPosition >= 6 && this.cursorPosition <= 8) {
        const secondIndex = ind7 + ind8;
        const newSecond = +secondIndex - 1;

        newValue = newSecond.toString();
        if (secondIndex === "--") {
          newValue = "0";
        }
        if (parseInt(newValue) < 0) {
          newValue = "59";
        } else if (parseInt(newValue) < 10) {
          newValue = "0" + newValue;
        }
        const beforesecondIndex = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
        const aftersecondIndex = ind9 + ind10 + ind11;
        const second = beforesecondIndex + newValue.toString() + aftersecondIndex;
        this.value = second;
      }

      // type
      if (this.timeType.mask === this.hhMmSsAM) {
        if (this.cursorPosition > 8) {
          let typeind = ind10.toString();

          const beforeHourind =
            ind1 + ind2 + ind3 + ind4 + ind5 + ind6 + ind7 + ind8 + ind9;
          const afterHourind = ind11;

          if (ind10 === "p") {
            typeind = "a";
          } else if (ind10 === "a") {
            typeind = "p";
          }
          this.value = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hhMmAM) {
        if (this.cursorPosition >= 6) {
          let typeind = ind7.toString();

          const beforeHourind = ind1 + ind2 + ind3 + ind4 + ind5 + ind6;
          const afterHourind = ind8;

          if (ind7 === "p") {
            typeind = "a";
          } else if (ind7 === "a") {
            typeind = "p";
          }
          this.value = beforeHourind + typeind + afterHourind;
        }
      }
      if (this.timeType.mask === this.hhAM) {
        if (this.cursorPosition >= 3) {
          let typeind2 = ind4.toString();

          const beforeHourind = ind1 + ind2 + ind3;
          const afterHourind = ind5;

          if (ind4 === "p") {
            typeind2 = "a";
          } else if (ind4 === "a") {
            typeind2 = "p";
          }
          this.value = beforeHourind + typeind2 + afterHourind;
        }
      }
    }

    if (event.which === 38 || event.which === 40) {
      this.input.nativeElement.style.caretColor = "transparent";
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    if (event.keyCode === 46) {
      event.preventDefault();
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
    this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
  }
}
