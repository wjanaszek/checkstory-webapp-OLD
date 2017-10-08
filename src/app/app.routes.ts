import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './dashboard/myaccount/myaccount.component';
import { StoryDetailComponent } from './dashboard/story-detail/story-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'welcome_page',
    component: WelcomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'myaccount', component: MyAccountComponent },
      { path: 'stories/:id', component: StoryDetailComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
