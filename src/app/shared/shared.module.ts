import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { DaypickerComponent } from './daypicker/daypicker.component';
import { ButtonComponent } from './button/button.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [BlockComponent, DaypickerComponent, ButtonComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    BlockComponent,
    DaypickerComponent,
    ButtonComponent,
    MatDialogModule,
  ]
})
export class SharedModule {}
