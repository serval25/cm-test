import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'pages',
		loadChildren: () => import('../pages/pages.module').then((loaded) => loaded.PagesModule),
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
	useHash: true,
	scrollPositionRestoration: 'enabled',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
