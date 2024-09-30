import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'test', loadChildren: () => import('./modules/tests/tests.module').then(m => m.TestsModule) },
  { path: 'start', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: ':id', loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule) },
  { path: '**', redirectTo: '/start' },
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
