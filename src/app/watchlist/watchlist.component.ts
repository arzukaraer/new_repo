import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search/search.service'; 
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
  }

}
