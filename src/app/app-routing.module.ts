import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
    
  },
  {
    path: 'heroes',
    loadChildren: () => import( './heroes/heroes.module' ).then( m => m.HeroesModule ),
    canLoad:[ AuthGuard ],
    canActivate:[ AuthGuard ]
  },
  // {
  //   path: '404',
  //   component: ErrorPageComponent
  // },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: 'auth'
  },
  
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
