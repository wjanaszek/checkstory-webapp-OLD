import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './myaccount/myaccount.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

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
