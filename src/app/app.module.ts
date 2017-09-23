import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoriesComponent } from './stories/stories.component';
import { MdFormFieldModule } from '@angular/material';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './dialogs/register-dialog/register-dialog.component';
import { UserService } from './services/user-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StoriesComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    MdFormFieldModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'stories',
        component: StoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginDialogComponent
      },
      {
        path: 'register',
        component: RegisterDialogComponent
      }
    ])
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
