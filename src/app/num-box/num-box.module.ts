import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumBoxComponent } from './num-box.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [NumBoxComponent],
    imports: [ CommonModule, FormsModule ],
    exports: [NumBoxComponent],
    providers: [],
})
export class NumBoxModule {}
