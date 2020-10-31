import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { ActivatedRoute } from '@angular/router';
import { OutputGraphService } from './output-graph.service';


@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css'],
  
})
export class OutputGraphComponent implements OnInit {
  chartHighStockData;
  data=[];
  ticker: string='';
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {
    series: [{
      data: [],
      type: 'line'
    }]
  };

  
  constructor(private outputGraphService: OutputGraphService,
              private route: ActivatedRoute) { }

  ngOnInit():void{

    this.route.params.subscribe(params => this.ticker = params.ticker);
    this.outputGraphService.getHighstockChart(this.ticker)
      .subscribe((chartData) => {
        //console.log("CHART here");
        //console.log(this.ticker);
        //console.log(chartData);
        this.chartHighStockData = chartData;
       //console.log(this.chartHighStockData.length);
        for (var i=0; i<this.chartHighStockData.length;i++){
          var regexpNames= /(\d+)-(\d+)-(\d+)\w(\d+):(\d+):(\d+)/mg;
          //console.log(this.chartHighStockData[0].date);
          var match=regexpNames.exec(this.chartHighStockData[i].date);
          console.log(match);
          var utc_time=Date.UTC(parseInt(match[1]),parseInt(match[2])-1,parseInt(match[3]),parseInt(match[4]),parseInt(match[5]));
          //console.log(utc_time);
          var price=this.chartHighStockData[i].open;
          this.data.push([utc_time,price]);
          //console.log(this.data)
        }
          this.chartOptions = {
            xAxis: {
              type: 'datetime',
              labels: {
                formatter: function() {
                  return Highcharts.dateFormat('%H:%M', this.value)
                }
              }
            },
            series: [{
              data: this.data,
              type: 'line'
            }]
          }
          
      });



      }

    }