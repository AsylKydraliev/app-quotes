import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../shared/quotes.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quote: Quote | null = null;
  quotes!: Quote[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes() {
    this.http.get<{[id: string]: Quote}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes.json')
      .pipe(map(result => {
        if(result === null) {
          return [];
        }
        return Object.keys(result).map(id => {
          const quote = result[id];
          return new Quote(id, quote.category, quote.author, quote.text);
        });
      }))
      .subscribe(quotes =>{
        this.quotes = quotes;
      });
  }

  getQuote(){
    this.http.get<Quote>
    (`https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes.json?orderBy="category"&equalTo="star-wars"`)
      .subscribe(quote =>{
        this.quote = quote;
      });
  }
}
