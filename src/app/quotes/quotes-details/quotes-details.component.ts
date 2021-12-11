import { Component, OnInit } from '@angular/core';
import { Quote } from '../../shared/quotes.model';

@Component({
  selector: 'app-quotes-details',
  templateUrl: './quotes-details.component.html',
  styleUrls: ['./quotes-details.component.css']
})
export class QuotesDetailsComponent implements OnInit {
  quotes!: Quote[];

  constructor() { }

  ngOnInit(): void {
  }
}
