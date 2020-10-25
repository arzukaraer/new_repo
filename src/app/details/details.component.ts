import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';


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
  datafromservice;
  datafromcompany;
  topCompanyNews;
  articles;

  
  

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.ticker = params.ticker);
    this.detailsService.getDetails(this.ticker)
      .subscribe((data) => {
        console.log("here");
        console.log(this.ticker);
        console.log(data);
        this.datafromservice = data[0];
        console.log(this.datafromservice.name);
      });
      this.detailsService.getCompanyOutlook(this.ticker)
      .subscribe((companyData)=> {
          console.log("HERE");
          console.log(companyData);
          this.datafromcompany=companyData;

        });
        this.detailsService.getTopNews(this.ticker)
        .subscribe((topNews)=> {
          console.log("Loc HERE");
          console.log(topNews);
          this.topCompanyNews=topNews;
          this.articles=this.topCompanyNews.articles;
          console.log(this.topCompanyNews.articles[0])

        });

  }
}
