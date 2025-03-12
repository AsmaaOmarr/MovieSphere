import { Routes } from '@angular/router';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentScreenComponent } from './components/payment-screen/payment-screen.component';
import { PaypalSuccessScreenComponent } from './components/paypal-success-screen/paypal-success-screen.component';
import { SubscriptionDetailsScreenComponent } from './components/subscription-details-screen/subscription-details-screen.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { AboutComponent } from './components/about/about/about.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { StartComponent } from './components/Auth/start/start.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { subscriptionGuard } from './guards/subscription.guard';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: StartComponent,
  //   children: [
  //     { path: '', redirectTo: 'register', pathMatch: 'full' },
  //     { path: 'register', component: RegisterComponent },

  //     { path: 'login', component: LoginComponent },
  //   ],
  // },
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
      { path: 'favorites', component: FavoritesComponent, title: 'favorites' },
      

      {
        path: 'subscribe',
        component: SubscriptionDetailsScreenComponent,
        title: 'subscribe Details',
      },
      { path: 'payment', component: PaymentScreenComponent, title: 'Payment' },
      {
        path: 'success',
        component: PaypalSuccessScreenComponent,
        title: 'Payment Success',
      },
      {
        path: 'movie/:id',
        component: MovieDetailComponent,
        title: 'Movie Details',
        canActivate: [subscriptionGuard],
      },
    ],
  },
  { path: 'about', component: AboutComponent, title: 'About Us' },
];
