import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesMaterialModule } from './pages-material.module';
import { RequestPageComponent } from './requests-page/requests-page.component';
import { NodesPageComponent } from './nodes-page';
import { ComputationsPageComponent } from './computations-page';
import { UsersPageComponent } from './users-page';
import { AppCommonModule } from '../common/common.module';

@NgModule({
	declarations: [
		RequestPageComponent,
		NodesPageComponent,
		ComputationsPageComponent,
		UsersPageComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PagesRoutingModule,
		PagesMaterialModule,
		AppCommonModule,
	],
	exports: [
		RequestPageComponent, 
		NodesPageComponent, 
		ComputationsPageComponent,
		UsersPageComponent,
	],
	providers: [ ],
})
export class PagesModule {}
