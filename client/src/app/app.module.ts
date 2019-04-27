import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddCategorieComponent } from './components/home/add-categorie/add-categorie.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { UpdateCategorieComponent } from './components/home/update-categorie/update-categorie.component';
import { AddElectionComponent } from './components/home/add-election/add-election.component';
import { UpdateElectionComponent } from './components/home/update-election/update-election.component';
import { InfoElectionComponent } from './components/home/info-election/info-election.component';
import { HistoriqueComponent } from './components/home/historique/historique.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    SidebarComponent,
    AddCategorieComponent,
    ConfirmDeleteComponent,
    UpdateCategorieComponent,
    AddElectionComponent,
    UpdateElectionComponent,
    InfoElectionComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    AddCategorieComponent,
    ConfirmDeleteComponent,
    UpdateCategorieComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
