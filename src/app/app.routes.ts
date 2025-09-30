import { Routes } from '@angular/router';
import { FirstForm } from '../first-form/first-form';
import { SecondForm } from '../second-form/second-form';
import { ThirdForm } from '../third-form/third-form';


export const routes: Routes = [
  { path: 'first', component: FirstForm },            // default route
  { path: 'second', component: SecondForm },      // /about
  { path: 'third', component: ThirdForm }, 
];