import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Quote } from '../shared/quotes.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-quotes.component.html',
  styleUrls: ['./add-quotes.component.css']
})
export class AddQuotesComponent implements OnInit {
  quote!: Quote;
  category = '';
  author = '';
  text = '';
  quoteId!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.quoteId  = params['id'];
        this.http.get<Quote>(`https://app-blog-f76a2-default-rtdb.firebaseio.com/posts/${this.quoteId}.json`)
          .subscribe(result => {
            this.quote = result;
            this.text = this.quote.text;
            this.category = this.quote.category;
            this.author = this.quote.author;
          });
      }
    });
  }

  addQuote(event: Event) {
    event.preventDefault();
    const category = this.category;
    const author = this.author;
    const text = this.text;
    const bodyQuote = {category, author, text};

    if(this.quoteId){
      this.onEditQuote();
    } else {
      this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes.json', bodyQuote).subscribe();
    }
  }

  onEditQuote() {
    const category = this.category;
    const author = this.author;
    const text = this.text;
    const bodyQuote = {category, author, text};
    this.http.put(`https://app-blog-f76a2-default-rtdb.firebaseio.com/quotes/${this.quoteId}.json`, bodyQuote)
      .subscribe();
  }
}
