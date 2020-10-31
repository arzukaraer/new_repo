import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { PortfolioService } from './portfolio.service';
import {BrowserModule} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio=[];
  portfolio_keys=[];
  portfolio_quantity=[];
  portfolio_averagecost_share=[];
  portfolio_totalcost=[];
  datafromportfolio:any;
  change_perc_array=[];
  portfolio_currentprice=[];
  portfolio_currentvalue=[];
  
  constructor(private portfolioService:PortfolioService) { }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      var regexpNames= /(portfolio)(\w+)/mg;
      var match=regexpNames.exec(key);
      console.log(match)
      if (match != null){
        let val = JSON.parse(localStorage.getItem(key));
        this.portfolio_keys.push(match[2]);

        
      }
      
  }


  for (let i = 0; i < this.portfolio_keys.length; i++){
    this.portfolio = JSON.parse(localStorage.getItem("portfolio"+this.portfolio_keys[i]));
    console.log(this.portfolio);
    if (parseInt(this.portfolio[0]) >0 )
    {
    var averagecost_share= parseFloat(this.portfolio[1])/parseInt(this.portfolio[0]) ;
    }
    this.portfolio_quantity[i]=this.portfolio[0];
    this.portfolio_averagecost_share[i]=averagecost_share.toFixed(2);
    this.portfolio_totalcost[i]=this.portfolio[1].toFixed(2);
    
  }
  console.log(this.portfolio_quantity);
  console.log(this.portfolio_averagecost_share);
  console.log(this.portfolio_totalcost);



  
  console.log(this.portfolio_keys);
  
  this.portfolioService.getPortfolioTickers(this.portfolio_keys)
  .subscribe((data) => {
    console.log("in getportfoliotickerts");
    console.log(this.portfolio_keys);
    console.log(data);
    this.datafromportfolio=data;
    console.log("REs");
    console.log(this.datafromportfolio);
    console.log(this.portfolio_keys.length);
    for (let i = 0; i < this.portfolio_keys.length; i++){
    console.log("HERE");
    var change= parseFloat(this.portfolio_averagecost_share[i])-parseFloat(this.datafromportfolio[i].last);
    var change_perc=100*change/parseFloat(this.portfolio_averagecost_share[i]);
    this.change_perc_array[i]=change_perc;
    this.portfolio_currentprice[i]=this.datafromportfolio[i].last;
    this.portfolio_currentvalue[i]=parseFloat(this.datafromportfolio[i].last)*parseFloat(this.portfolio_quantity[i]);
    
  }

    




  console.log(this.change_perc_array);
  console.log(this.portfolio_currentprice);
  console.log(this.portfolio_currentvalue);

    
  });

   
    
      
    
  

  }
  

}

