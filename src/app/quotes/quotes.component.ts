import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../shared/quotes.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] | null = null;
  category!: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.http.get<{[id: string]: Quote}>
    ('https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes.json')
      .pipe(map(result => {
        if(result === null) {
          return [];
        }
        return Object.keys(result).map(id => {
          const quote = result[id];
          return new Quote(id, quote.category, quote.text, quote.author);
        });
      }))
      .subscribe(quotes =>{
        this.quotes = [];
        this.quotes = quotes;
      });

    this.route.params.subscribe((params: Params) => {
      if (params['category']){this.category  = params['category']
        this.http.get<{[id: string]: Quote}>
        (`https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes.json?orderBy="category"&equalTo="${this.category}"`)
          .pipe(map(result => {
            if(result === null) {
              return [];
            }
            return Object.keys(result).map(id => {
              const quote = result[id];
              return new Quote(id, quote.category, quote.text, quote.author);
            });
          }))
          .subscribe(quotes =>{
            this.quotes = [];
            this.quotes = quotes;
          });
      }
    });
  }

  onDeleteQuote(id: string){
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes/${id}.json`).subscribe();
  }
}
