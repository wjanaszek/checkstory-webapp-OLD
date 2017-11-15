import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChangePasswordDialogComponent, DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStoryDialogComponent, StoriesComponent } from './dashboard/stories/stories.component';
import { UserService } from './shared/services/user-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { routing } from './app.routes';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { MyAccountComponent } from './dashboard/myaccount/myaccount.component';
import { AddPhotoDialogComponent, StoryDetailComponent } from './dashboard/story-detail/story-detail.component';
import { AboutComponent } from './dashboard/about/about.component';
import { StoriesService } from './shared/services/stories.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Md5 } from 'ts-md5/dist/md5';
import { RegistrationValidationService } from './shared/services/registration.validation.service';
import { ChangePasswordValidationService } from './shared/services/change-password.validation.service';
import { ConfirmDialogComponent } from './shared/confirm.dialog.component';
import { DialogsService } from './shared/services/dialogs.service';
import { StoryDetailEditComponent } from './dashboard/story-detail/story-detail.edit/story-detail.edit.component';
import { PhotosService } from './shared/services/photos.service';
import { EditPhotoDialogComponent, PhotoListComponent, PhotoViewDialogComponent } from './dashboard/story-detail/photo-list/photo-list.component';
import { NgProgressBrowserXhr, NgProgressModule } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { AuthModule } from './auth/auth.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GlobalErrorHandler } from './error-page/global.error.handler';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { MessageService } from './shared/services/message.service';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

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
    AboutComponent,
    ChangePasswordDialogComponent,
    PageNotFoundComponent,
    AddStoryDialogComponent,
    ConfirmDialogComponent,
    StoryDetailEditComponent,
    PhotoListComponent,
    AddPhotoDialogComponent,
    EditPhotoDialogComponent,
    PhotoViewDialogComponent,
    ErrorPageComponent,
    ToolbarComponent
  ],
  imports: [
    routing,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    NgProgressModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    MockBackend,
    BaseRequestOptions,
    StoriesService,
    AuthGuard,
    Md5,
    RegistrationValidationService,
    ChangePasswordValidationService,
    DialogsService,
    PhotosService,
    MessageService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ChangePasswordDialogComponent,
    AddStoryDialogComponent,
    AddPhotoDialogComponent,
    EditPhotoDialogComponent,
    PhotoViewDialogComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
