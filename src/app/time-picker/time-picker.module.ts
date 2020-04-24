import { NgModule } from '@angular/core';

import { TimePickerComponent } from './time-picker.conponent';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
    providers: [],
})
export class TimePickerModule { }
