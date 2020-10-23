import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ticker: string="AAPL";
  companyName:string="Apple";
  tradingExchange="NAS";
  lastPrice=23;
  percentageChange=23;
  date="10/23/20";
  openMarket=true;
  closedMarket=true;
  highPrice= 110.25;
  lowPrice=105; 
  openPrice=105.17;
  previousClose= 107.12; 
  volume=11223;
  desc="aaakdi";

  
  

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.ticker = params.ticker);
    this.detailsService.getDetails()
      .subscribe((data) => {
        console.log(this.ticker);
        console.log(data)
      });
  }
}
