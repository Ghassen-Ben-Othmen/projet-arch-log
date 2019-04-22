import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { UpdateCategorieComponent } from './components/home/update-categorie/update-categorie.component';
import { AddElectionComponent } from './components/home/add-election/add-election.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [NotAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'update-categorie/:id', component: UpdateCategorieComponent },
    { path: 'add-election', component: AddElectionComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
