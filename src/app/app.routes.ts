import { Routes } from '@angular/router';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { StartComponent } from './components/Auth/start/start.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { subscriptionGuard } from './guards/subscription.guard';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SubscriptionDetailsScreenComponent } from './components/subscription/subscription details screen/subscription-details-screen/subscription-details-screen.component';
import { PaymentScreenComponent } from './components/subscription/Payment Screen/payment-screen/payment-screen.component';
import { PaypalSuccessScreenComponent } from './components/subscription/paypal-success-screen/paypal-success-screen.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: StartComponent,

    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },

      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'discovery', pathMatch: 'full' },
      { path: 'discovery', component: DiscoveryComponent, title: 'discovery' },
      { path: 'topRated', component: DiscoveryComponent, title: 'top rated' },
      { path: 'settings', component: DiscoveryComponent, title: 'settings' },
      {
        path: 'comingSoon',
        component: DiscoveryComponent,
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
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
    ],
  },

  { path: 'about', component: AboutPageComponent, title: 'About Us' },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
