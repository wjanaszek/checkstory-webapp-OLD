import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConfirmDialogComponent2, DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStoryDialogComponent, StoriesComponent, RemoveStoryDialogComponent } from './dashboard/stories/stories.component';
import { UserService } from './shared/services/user-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatListModule, MatDialogModule,
  MatTabsModule, MatMenuModule
} from '@angular/material';
import { routing } from './app.routes';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { ChangePasswordDialogComponent, MyAccountComponent } from './dashboard/myaccount/myaccount.component';
import { StoryDetailComponent } from './dashboard/story-detail/story-detail.component';
import { AboutComponent } from './dashboard/about/about.component';
import { StoriesService } from './shared/services/stories.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Md5 } from 'ts-md5/dist/md5';
import { RegistrationValidationService } from './shared/services/registration.validation.service';
import { ChangePasswordValidationService } from './shared/services/change-password.validation.service';
import { ConfirmDialogComponent } from './shared/confirm.dialog.component';

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
    ConfirmDialogComponent2,
    AboutComponent,
    ChangePasswordDialogComponent,
    PageNotFoundComponent,
    AddStoryDialogComponent,
    RemoveStoryDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    ConfirmDialogComponent2
  ],
  providers: [
    UserService,
    AuthenticationService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    StoriesService,
    AuthGuard,
    Md5,
    RegistrationValidationService,
    ChangePasswordValidationService
  ],
  entryComponents: [
    ConfirmDialogComponent2,
    ChangePasswordDialogComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
