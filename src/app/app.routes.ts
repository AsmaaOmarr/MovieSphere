import { Routes } from '@angular/router';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { HomeComponent } from './components/home/home.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
    children: [
      { path: '', redirectTo: 'discovery', pathMatch: 'full' },
      { path: 'discovery', component: DiscoveryComponent, title: 'discovery' },
      { path: 'topRated', component: TopRatedComponent, title: 'top rated' },
      {
        path: 'comingSoon',
        component: ComingSoonComponent,
        title: 'coming soon',
      },
    ],
  },
];
