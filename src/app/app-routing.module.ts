import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { AddQuotesComponent } from './add-quotes/add-quotes.component';
import { LinksComponent } from './links/links.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {path: '', component: LinksComponent, children: [
      {path: '', component: QuotesComponent},
      {path: 'quotes/:category', component: QuotesComponent},
    ]},
  {path: ':id/edit', component: AddQuotesComponent},
  {path: 'quotes/:category/:id/edit', component: AddQuotesComponent},
  {path: 'add-quotes', component: AddQuotesComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
