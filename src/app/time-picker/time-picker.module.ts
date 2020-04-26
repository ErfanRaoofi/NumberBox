import { NgModule } from '@angular/core';

import { TimePickerComponent } from './time-picker.conponent';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
    imports: [CommonModule, FormsModule, TextMaskModule, NgxMaskModule.forRoot()],
    exports: [TimePickerComponent],
    declarations: [TimePickerComponent],
    providers: [],
})
export class TimePickerModule { }
