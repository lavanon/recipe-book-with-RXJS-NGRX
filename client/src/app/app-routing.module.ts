import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './pages/create/create.page';
import { DetailsPage } from './pages/details/details.page';
import { EditPage } from './pages/edit/edit.page';
import { HomePage } from './pages/home/home.page';
import { LandingPage } from './pages/landing/landing.page';


const routes: Routes = [
  {
    path: 'landing-page',
    component: LandingPage,
  },
  {
    path: 'home',
    redirectTo: 'recipes',
  },
  {
    path: 'recipes',
    component: HomePage,
  },
  {
    path: 'create',
    component: CreatePage,
  },
  {
    path: 'recipes/:id',
    component: DetailsPage,
  },
  {
    path: 'recipes/:id/edit',
    component: EditPage,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'landing-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
