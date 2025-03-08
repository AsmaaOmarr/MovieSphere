import { Routes } from '@angular/router';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { HomeComponent } from './components/home/home.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { StartComponent } from './components/Auth/start/start.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { LoginComponent } from './components/Auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: StartComponent, // الصفحة المقسومة نصين
    children: [
      { path: '', component: RegisterComponent }, // عرض الريجستر افتراضيًا
      { path: 'login', component: LoginComponent } // عند الذهاب إلى login، يتم عرض اللوجين فقط على اليمين
    ],
  },
  {path: 'home',component: HomeComponent,title: 'home',
    children: [
      { path: '', redirectTo: 'discovery', pathMatch: 'full' },
      { path: 'discovery', component: DiscoveryComponent, title: 'discovery' },
      { path: 'topRated', component: TopRatedComponent, title: 'top rated' },
      {path: 'comingSoon',component: ComingSoonComponent,title: 'coming soon',},
    ],
  },
];
