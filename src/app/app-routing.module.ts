import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { AddQuotesComponent } from './add-quotes/add-quotes.component';
import { QuotesDetailsComponent } from './quotes/quotes-details/quotes-details.component';

const routes: Routes = [
  {path: '', component: QuotesComponent, children: [
      {path: 'quotes-details', component: QuotesDetailsComponent}
    ]},
  {path: 'add-quotes', component: AddQuotesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
