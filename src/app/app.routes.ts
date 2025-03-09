import { Routes } from '@angular/router';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentScreenComponent } from './components/payment-screen/payment-screen.component';
import { PaypalSuccessScreenComponent } from './components/paypal-success-screen/paypal-success-screen.component';
import { SubscriptionDetailsScreenComponent } from './components/subscription-details-screen/subscription-details-screen.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';

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
      {path : 'subscribe', component: SubscriptionDetailsScreenComponent, title: 'subscribe Details' },
      { path: 'payment', component: PaymentScreenComponent, title: 'Payment' },
      { path: 'success', component: PaypalSuccessScreenComponent, title: 'Payment Sucess' },

    ],
  },
];
