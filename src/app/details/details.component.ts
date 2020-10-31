import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
  closeResult;
  modalReference;
  isfavorited;
  dp;
  quantity;
  totalPrice;
  portfolioArray=[];
  
  
  

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private modalService: NgbModal
    ) { }

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
  open(content) {
    this.modalReference=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  buyStock() {
    localStorage.setItem("key","value");
    this.modalReference.dismiss();
  }
  
  onClickStar(){
  let isClicked=localStorage.getItem(this.ticker+"star");
  if (isClicked === undefined){
     localStorage.setItem(this.ticker+"star",JSON.stringify(true));
  }
  else{
     this.isfavorited= JSON.stringify(!JSON.parse(localStorage.getItem(this.ticker+"star")));
     console.log(this.isfavorited);
     localStorage.setItem(this.ticker+"star",this.isfavorited);
     
  }
  
  
  }

  modelChangeFn() {
    this.quantity=this.dp;
    this.totalPrice=this.quantity*this.datafromservice.open;
  }
  
  close(){
    var portfoliokey="portfolio"+this.datafromcompany.ticker 

    if (portfoliokey in localStorage){
       console.log("FOUND THE KEY")
       this.portfolioArray=JSON.parse(localStorage.getItem("portfolio"+ this.datafromcompany.ticker));
       this.portfolioArray[0]=parseInt(this.dp)+parseInt(this.portfolioArray[0]);
       //console.log(this.portfolioArray[0][1]);
       this.portfolioArray[1]=parseFloat(this.portfolioArray[1])+ parseFloat(this.dp)*parseFloat(this.datafromservice.open);
       console.log(parseFloat(this.portfolioArray[1]))
       localStorage.setItem("portfolio"+ this.datafromcompany.ticker ,JSON.stringify(this.portfolioArray));

    }

    else{
      this.portfolioArray.push(this.dp)
      this.portfolioArray.push(this.dp*this.datafromservice.open);
      localStorage.setItem("portfolio"+ this.datafromcompany.ticker ,JSON.stringify(this.portfolioArray));
      console.log(localStorage.getItem("portfolio"+ this.datafromcompany.ticker));
      console.log(this.dp);
      }
      this.modalReference.close('Save click');

}



}
