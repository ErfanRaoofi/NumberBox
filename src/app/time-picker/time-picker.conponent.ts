import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Subject } from "rxjs";

export type AXTimeType = "hh:ss" | "HH:SS";
export interface AXTimeTypeComp {
  mask: AXTimeType;
}

@Component({
  selector: "app-time-picker",
  templateUrl: "time-picker.component.html",
})
export class TimePickerComponent implements AXTimeTypeComp, OnInit {
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

  // @Input() mask = [/[0-1]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];

  @Input() HhMmSs = {
    guide: false,
    showMask: false,
    mask: [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/],
  };

  @Input() HhMm = {
    guide: false,
    showMask: false,
    mask: [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/],
  };
  @Input() hhMm = {
    guide: false,
    showMask: false,
    mask: [/[0-2]/, /[0-9]/, /[0-5]/, /[0-9]/, /[0-5]/, /[0-9]/],
  };

  @Input() mask: AXTimeType = "hh:ss";

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
    if (this.cursorPosition < 2) {
      // this.cursorPosition -= 1;
      if (event.keyCode === 40) {
        const tmp = this.value.charAt(0);
        const tmp2 = this.value.charAt(1);

        const tmp3 = tmp + tmp2;

        const tmp4 = +tmp3 + 1;

        this.value = tmp4.toString();
        
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
