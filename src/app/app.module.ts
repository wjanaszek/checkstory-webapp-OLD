import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesComponent } from './stories/stories.component';
import { UserService } from './services/user-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MdFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { routing } from './app.routes';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StoriesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    MdFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    AuthenticationService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
