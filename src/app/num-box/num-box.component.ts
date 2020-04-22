import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "app-num-box",
  templateUrl: "./num-box.component.html",
})
export class NumBoxComponent {
  @Input() minLength ;
  @Input() maxLength ;
  
  tempNum: string = '';
  tmp;
  count;
  findDots: boolean = false;
  findMinus: boolean = false;

  @Input() step: number = 1;

  keyPress(event: any) {
    debugger
    let pattern = /[0-9\.\-]/;
    let pat = /[\-]/;

    let inputChar = String.fromCharCode(event.charCode);

    if (this.tempNum.match(/\./g) === null) {
      this.findDots = false;
    }
    if (this.tempNum.search("-") === null) {
      this.findMinus = false;
    }

    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      if (inputChar === '.') {
        if (this.findDots) {
          event.preventDefault();
        }
        this.findDots = true;
        this.findMinus = true;
      }
    }
    
    if (inputChar === '-') {
      if (this.findMinus) {
        event.preventDefault();
      }
      this.findMinus = true;
    }
  
  }

  keyDown(event: any) {
    if (event.keyCode === 40) {
      this.tmp = +this.tempNum;

      this.count = +this.tmp - this.step;

      this.tempNum = this.count.toString();
    }

    if (event.keyCode === 38) {
      this.tmp = this.tempNum;

      this.count = +this.tmp + this.step;

      this.tempNum = this.count.toString();
    }
  }
}
