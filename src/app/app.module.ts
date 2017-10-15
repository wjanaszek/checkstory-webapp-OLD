import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConfirmDialogComponent, DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesComponent } from './dashboard/stories/stories.component';
import { UserService } from './services/user-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MdFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatListModule, MatDialogModule } from '@angular/material';
import { routing } from './app.routes';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ChangePasswordDialogComponent, MyAccountComponent } from './dashboard/myaccount/myaccount.component';
import { StoryDetailComponent } from './dashboard/story-detail/story-detail.component';
import { AboutComponent } from './dashboard/about/about.component';
import { StoriesService } from './services/stories.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StoriesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    MyAccountComponent,
    StoryDetailComponent,
    ConfirmDialogComponent,
    AboutComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    StoriesService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ChangePasswordDialogComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
