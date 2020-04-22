import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumComponent } from './num.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ NumComponent],
    imports: [ CommonModule, FormsModule ],
    exports: [NumComponent],
    providers: [],
})
export class NumModule {}
