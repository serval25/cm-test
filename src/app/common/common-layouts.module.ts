import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [BlankLayoutComponent],
	exports: [BlankLayoutComponent],
})
export class CommonLayoutsModule {}
