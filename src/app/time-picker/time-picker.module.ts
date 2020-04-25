import { NgModule } from '@angular/core';

import { TimePickerComponent } from './time-picker.conponent';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [CommonModule, FormsModule, TextMaskModule],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
    providers: [],
})
export class TimePickerModule { }
