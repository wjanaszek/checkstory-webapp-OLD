import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './dashboard/myaccount/myaccount.component';
import { StoryDetailComponent } from './dashboard/story-detail/story-detail.component';
import { AboutComponent } from './dashboard/about/about.component';
import { StoriesComponent } from './dashboard/stories/stories.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoryDetailEditComponent } from './dashboard/story-detail/story-detail.edit/story-detail.edit.component';

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
    canActivate: [AuthGuard],
    children: [
      { path: 'myaccount', component: MyAccountComponent },
      { path: 'story-list', component: StoriesComponent },
      { path: 'story-details/:id', component: StoryDetailComponent },
      { path: 'story-details/:id/edit', component: StoryDetailEditComponent },
      { path: 'about', component: AboutComponent }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
