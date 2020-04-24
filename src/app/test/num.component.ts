import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-num",
  templateUrl: "./num.component.html",
})
export class NumComponent {
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

  handleKeyPress(event: any) {
    const pattern = /[0-9\.]/g;
    const pat = /[0-9\-]/g;

    const inputChar = String.fromCharCode(event.charCode);

    if (this.value.match(/\./g) === null) {
      this.findDots = false;
    }
    if (this.value.search("-") === null) {
      this.findMinus = false;
    }

    if (
      this.input.nativeElement.selectionStart ||
      this.input.nativeElement.selectionStart === 0
    ) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
      this.cursorPosition += 1;
    }

    if (this.cursorPosition <= 1) {
      if (!pat.test(inputChar)) {
        event.preventDefault();
      }
      if (this.value.match(/\-/g)) {
        event.preventDefault();
      }
    }
    if (this.cursorPosition !== 1) {
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      } else {
        if (inputChar === ".") {
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

  handleKeyUp(event: any) {
   
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

    // set delay with rxjs
    this.delaySearch(event);

    // backspace Control
    if (event.keyCode === 8) {
      if (this.value.length <= 0) {
        this.cursorPosition = 0;
      } else {
        this.cursorPosition -= 1;
      }
    }
   
  }

  handleKeyDown(event: any) {
    // step and +- with up key and down key
    this.dotPosition = this.value.indexOf(".") + 1;
    if (this.value.match(/\./g)) {
      if (this.dotPosition > this.cursorPosition) {
        // this.cursorPosition -= 1;
        if (event.keyCode === 40) {
          this.tmp = +this.value;
          this.count = +this.tmp - this.intStep;
          this.value = this.count.toFixed(this.floatCount);
        }

        if (event.keyCode === 38) {
          this.tmp = this.value;
          this.count = +this.tmp + this.intStep;
          this.value = this.count.toFixed(this.floatCount);
        }
      } else {
        if (event.keyCode === 40) {
          this.tmp = +this.value;
          this.count = +this.tmp - this.floatStep;
          this.value = this.count.toFixed(this.floatCount);
        }

        if (event.keyCode === 38) {
          this.tmp = this.value;
          this.count = +this.tmp + this.floatStep;
          this.value = this.count.toFixed(this.floatCount);
        }
      }
    } else {
      if (event.keyCode === 40) {
        this.tmp = +this.value;
        this.count = +this.tmp - this.intStep;
        this.value = this.count.toString();
      }

      if (event.keyCode === 38) {
        this.tmp = this.value;
        this.count = +this.tmp + this.intStep;
        this.value = this.count.toString();
      }
    }

    // stop when keydown
    if (event.which === 38 || event.which === 40) {
      event.preventDefault();
      return false;
    }
  }

  handleClick() {
    if (
      this.input.nativeElement.selectionStart ||
      this.input.nativeElement.selectionStart === 0
    ) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
    }
  }

  delaySearch(e: KeyboardEvent) {
    Observable.create((observer) => {
      this.userQuestionUpdate = observer;
    });
    this.userQuestionUpdate
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((text: string) => this.checkMinMax(text));
    this.userQuestionUpdate.next((e.target as any).value);
  }

  checkMinMax(text) {
    if (this.min !== null) {
      if (+text < this.min) {
        this.value = "";
      }
    }
    if (this.max !== null) {
      if (+text > this.max) {
        this.value = "";
      }
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

  handleUpButton() {
    this.dotPosition = this.value.indexOf(".") + 1;
    if (this.value.match(/\./g)) {
      if (this.dotPosition > this.cursorPosition) {
        // this.cursorPosition -= 1;

        this.tmp = this.value;
        this.count = +this.tmp + this.intStep;
        this.value = this.count.toFixed(this.floatCount);
      } else {
        this.tmp = this.value;
        this.count = +this.tmp + this.floatStep;
        this.value = this.count.toFixed(this.floatCount);
      }
    } else {
      this.tmp = this.value;
      this.count = +this.tmp + this.intStep;
      this.value = this.count.toString();
    }
  }

  handleDownButton() {
    this.dotPosition = this.value.indexOf(".") + 1;
    if (this.value.match(/\./g)) {
      if (this.dotPosition > this.cursorPosition) {
        // this.cursorPosition -= 1;
        this.tmp = +this.value;
        this.count = +this.tmp - this.intStep;
        this.value = this.count.toFixed(this.floatCount);
      } else {
        this.tmp = +this.value;
        this.count = +this.tmp - this.floatStep;
        this.value = this.count.toFixed(this.floatCount);
      }
    } else {
      this.tmp = +this.value;
      this.count = +this.tmp - this.intStep;
      this.value = this.count.toString();
    }
  }
}
