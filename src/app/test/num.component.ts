import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-num",
  templateUrl: "./num.component.html",
  styleUrls: ['./num.component.scss']
})
export class NumComponent {
  @ViewChild("input") input: ElementRef<HTMLInputElement>;

  @Input() min: number = null;
  @Input() max: number = null;

  userQuestionUpdate = new Subject<string>();

  // value: string = "";

  tmp: any;

  count: number;

  findDots: boolean = false;
  findMinus: boolean = false;

  cursorPosition: number = 0;

  dotPosition;

  @Input() floatCount: number = 1;
  @Input() intStep: number = 1;
  @Input() floatStep: number = 0.1;

  @Input() decimalNumber: number = null;
  @Input() decimalConstant: number = 0.1;
  @Input() customStep: number = null;
  @Input() lastStep: number = null;

  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    if (this._value) {
      const old = this._value;
      if (old.search(/\./g) !== v.search(/\./g)) {
        if (this.cursorPosition <= old.search(/\./g)) {
          this.cursorPosition = v.search(/\./g);
        } else {
          this.cursorPosition = v.length;
        }
      }
    }
    this._value = v;
  }

  handleKeyPress(event: any) {
    const pattern = /[0-9\.]/g;
    const pat = /[0-9\-]/g;

    const inputChar = String.fromCharCode(event.charCode);

    if (this.value && this.value.match(/\./g) === null) {
      this.findDots = false;
    }
    if (this.value && this.value.search("-") === null) {
      this.findMinus = false;
    }

    // get cursur position when key press
    if (
      this.input.nativeElement.selectionStart ||
      this.input.nativeElement.selectionStart === 0
    ) {
      this.cursorPosition = this.input.nativeElement.selectionStart;
      this.cursorPosition += 1;
    }

    // control cursor when in first Index
    if (this.cursorPosition <= 1) {
      if (!pat.test(inputChar)) {
        event.preventDefault();
      }
      if (this.value && this.value.match(/\-/g)) {
        event.preventDefault();
      }
    }
    // control cursor when in another index
    if (this.cursorPosition !== 1) {
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      } else {
        // for contor decimal figur = 0 or null
        if (this.decimalNumber === null || this.decimalNumber === 0) {
          if (inputChar === ".") {
            event.preventDefault();
          }
        }
        // control decimal number (figur of decimal)
        if (this.value && this.value.match(/\./g)) {
          const figureAfterDot = this.value.length - this.value.indexOf(".");
          const dotIndex = this.value.indexOf(".");
          if (
            dotIndex - 1 + dotIndex + figureAfterDot >
              dotIndex - 1 + dotIndex + this.decimalNumber &&
            this.cursorPosition - 1 > dotIndex
          ) {
            event.preventDefault();
          }
        }
        // control '.' input
        if (inputChar === ".") {
          const lastChar = this.value.charAt(this.value.length - 1);
          // control . when last char is -
          if (lastChar.match(/\-/g)) {
            event.preventDefault();
          }
          // control . when find first dot
          if (this.findDots) {
            event.preventDefault();
          }
          this.findDots = true;
          this.findMinus = true;
        }
      }
    }
  }

  handleKeyUp(event: any) {
    if (event.which === 38 || event.which === 40) {
      this.input.nativeElement.style.caretColor = "auto";
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.keyCode === 38) {
      this.setCaret();
    }

    if (event.keyCode === 40) {
      this.setCaret();
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

  handleKeyDown(event: KeyboardEvent) {
    if (event.which === 38 || event.which === 40) {
      event.preventDefault();
      event.stopPropagation();
    }
    const defaultStep: number = Math.pow(
      this.decimalConstant,
      this.decimalNumber
    );
    // step and +- with up key and down key
    if (this.value && this.value.match(/\./g)) {
      this.dotPosition = this.value.indexOf(".");
      if (this.dotPosition >= this.cursorPosition) {
        if (event.keyCode === 40) {
          this.tmp = parseFloat(this.value);
          this.count = parseFloat(this.value) - this.intStep;
          this.value = this.count.toFixed(this.decimalNumber);
        }

        if (event.keyCode === 38) {
          this.tmp = parseFloat(this.value);
          this.count = parseFloat(this.value) + this.intStep;
          this.value = this.count.toFixed(this.decimalNumber);
        }
      } else {
        if (event.keyCode === 40) {
          if (this.customStep !== null) {
            this.tmp = parseFloat(this.value);
            this.lastStep =
              parseFloat(defaultStep.toFixed(this.decimalNumber)) +
              parseFloat(this.customStep.toFixed(this.decimalNumber)) -
              parseFloat(defaultStep.toFixed(this.decimalNumber));
            this.count = parseFloat(this.tmp) - this.lastStep;
            this.value = this.count.toFixed(this.decimalNumber);
          } else {
            this.tmp = parseFloat(this.value);
            this.count = parseFloat(this.tmp) - defaultStep;
            this.value = this.count.toFixed(this.decimalNumber);
          }
        }

        if (event.keyCode === 38) {
          if (this.customStep !== null) {
            this.tmp = parseFloat(this.value);
            this.lastStep =
              parseFloat(defaultStep.toFixed(this.decimalNumber)) +
              parseFloat(this.customStep.toFixed(this.decimalNumber)) -
              parseFloat(defaultStep.toFixed(this.decimalNumber));
            this.count = parseFloat(this.tmp) + this.lastStep;
            this.value = this.count.toFixed(this.decimalNumber);
          } else {
            this.tmp = parseFloat(this.value);
            this.count = parseFloat(this.tmp) + defaultStep;
            this.value = this.count.toFixed(this.decimalNumber);
          }
        }
      }
    } else {
      if (event.keyCode === 40) {
        if (this.value == null) {
          this.value = "0";
        } else {
          this.tmp = +this.value;
          this.count = +this.tmp - this.intStep;
          this.value = this.count.toString();
        }
      }

      if (event.keyCode === 38) {
        if (this.value == null) {
          this.value = "0";
        } else {
          this.tmp = this.value;
          this.count = +this.tmp + this.intStep;
          this.value = this.count.toString();
        }
      }
    }

    // stop when keydown
    if (event.which === 38 || event.which === 40) {
      this.input.nativeElement.style.caretColor = "transparent";
      event.preventDefault();
      event.stopPropagation();
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
    this.setCaretPosition(this.input.nativeElement, this.cursorPosition);
  }

  upStepHandel() {
    if (this.value == null) {
      this.value = "0";
    } else {
      const defaultStep: number = Math.pow(
        this.decimalConstant,
        this.decimalNumber
      );
      this.dotPosition = this.value.indexOf(".") + 1;
      if (this.value && this.value.match(/\./g)) {
        if (this.dotPosition > this.cursorPosition) {
          this.tmp = parseFloat(this.value);
          this.count = parseFloat(this.value) + this.intStep;
          this.value = this.count.toFixed(this.decimalNumber);
        } else {
          if (this.customStep !== null) {
            this.tmp = parseFloat(this.value);
            this.lastStep =
              parseFloat(defaultStep.toFixed(this.decimalNumber)) +
              parseFloat(this.customStep.toFixed(this.decimalNumber)) -
              parseFloat(defaultStep.toFixed(this.decimalNumber));
            this.count = parseFloat(this.tmp) + this.lastStep;
            this.value = this.count.toFixed(this.decimalNumber);
          } else {
            this.tmp = parseFloat(this.value);
            this.count = parseFloat(this.tmp) + defaultStep;
            this.value = this.count.toFixed(this.decimalNumber);
          }
        }
      } else {
        this.tmp = this.value;
        this.count = +this.tmp + this.intStep;
        this.value = this.count.toString();
      }
    }
  }

  downStepHandel() {
    if (this.value == null) {
      this.value = "0";
    } else {
      const defaultStep: number = Math.pow(
        this.decimalConstant,
        this.decimalNumber
      );
      this.dotPosition = this.value.indexOf(".") + 1;
      if (this.value && this.value.match(/\./g)) {
        if (this.dotPosition > this.cursorPosition) {
          this.tmp = parseFloat(this.value);
          this.count = parseFloat(this.value) - this.intStep;
          this.value = this.count.toFixed(this.decimalNumber);
        } else {
          if (this.customStep !== null) {
            this.tmp = parseFloat(this.value);
            this.lastStep =
              parseFloat(defaultStep.toFixed(this.decimalNumber)) +
              parseFloat(this.customStep.toFixed(this.decimalNumber)) -
              parseFloat(defaultStep.toFixed(this.decimalNumber));
            this.count = parseFloat(this.tmp) - this.lastStep;
            this.value = this.count.toFixed(this.decimalNumber);
          } else {
            this.tmp = parseFloat(this.value);
            this.count = parseFloat(this.tmp) - defaultStep;
            this.value = this.count.toFixed(this.decimalNumber);
          }
        }
      } else {
        this.tmp = +this.value;
        this.count = +this.tmp - this.intStep;
        this.value = this.count.toString();
      }
    }
  }

  handleUpButton(e) {
    this.upStepHandel();
  }

  handleDownButton(e) {
    this.downStepHandel();
  }

  @HostListener("mousewheel", ["$event"]) onMousewheel(event) {
    if (event.wheelDelta > 0) {
      this.input.nativeElement.style.caretColor = "transparent";

      this.upStepHandel();

      setTimeout(() => {
        this.setCaret();
        this.input.nativeElement.style.caretColor = "auto";
      }, 0);
    }
    if (event.wheelDelta < 0) {
      this.input.nativeElement.style.caretColor = "transparent";

      this.downStepHandel();

      setTimeout(() => {
        this.setCaret();
        this.input.nativeElement.style.caretColor = "auto";
      }, 0);
    }
  }
}
