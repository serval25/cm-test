import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from '../common/layouts/blank-layout/blank-layout.component';
import { ComputationsPageComponent } from './computations-page';
import { NodesPageComponent } from './nodes-page';
import { RequestPageComponent } from './requests-page/requests-page.component';
import { UsersPageComponent } from './users-page';

export const routes: Routes = [
	{
		path: '',
		component: BlankLayoutComponent,
		children: [
			{
				path: 'requests',
				component: RequestPageComponent,
			},
			{
				path: 'nodes',
				component: NodesPageComponent,
			},
			{
				path: 'computations',
				component: ComputationsPageComponent,
			},
			{
				path: 'users',
				component: UsersPageComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
