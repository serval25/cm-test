import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CommonPipesModule } from './common-pipes.module';
import { CommonMaterialModule } from './common-material.module';


registerLocaleData(localeRu);

@NgModule({
	imports: [
		CommonMaterialModule,
		CommonPipesModule,
		RouterModule,
	],
	exports: [
		CommonMaterialModule,
		CommonPipesModule,
		RouterModule,
	],
	providers: [
		
	],
})
export class AppCommonModule {}
