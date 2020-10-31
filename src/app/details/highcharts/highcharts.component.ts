import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { ActivatedRoute } from '@angular/router';
import {HighchartsService} from './highcharts.service'

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

  chartHighStockData;
  ohlc=[];
  datavolume=[];
  ticker: string='';
  groupingUnits = [[
    'week',                         // unit name
    [1]                             // allowed multiples
], [
    'month',
    [1, 2, 3, 4, 6]
]];
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {
    series: [{
      data: [],
      type: 'line'
    }]
  };

  constructor(private route: ActivatedRoute,private highchartsService:HighchartsService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.ticker = params.ticker);
    this.highchartsService.getHighstockChart(this.ticker)
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
          var open=this.chartHighStockData[i].open;
          var high=this.chartHighStockData[i].high;
          var low=this.chartHighStockData[i].low;
          var close=this.chartHighStockData[i].close;
          var volume=this.chartHighStockData[i].volume;
          this.ohlc.push([utc_time,open,high,low,close,volume]);
          this.datavolume.push([utc_time,volume])
          //console.log(this.datavolume)
        }
          this.chartOptions = {
            rangeSelector: {
              buttons: [{
                    type: 'day',
                    count: 7,
                    text: '7d'
                  },{
                    type: 'day',
                    count: 15,
                    text: '15d'
                  }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                  }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                  }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                  
                  }]
                },
  
          title: {
              text: this.ticker.toUpperCase() + ' Historical'
          },
  
          subtitle: {
              text: 'With SMA and Volume by Price technical indicators'
          },
  
          yAxis: [{
              startOnTick: false,
              endOnTick: false,
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'OHLC'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                  enabled: true
              }
          }, {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
          }],
  
          tooltip: {
              split: true
          },
          plotOptions: {
            series: {
                dataGrouping: {
                    units: this.groupingUnits
                }
            }
        },

      
  
          series: [{
              type: 'candlestick',
              name: this.ticker,
              id: this.ticker,
              zIndex: 2,
              data: this.ohlc
          }, {
              type: 'column',
              name: 'Volume',
              id: 'volume',
              data: this.datavolume,
              yAxis: 1
          }, {
              type: 'vbp',
              linkedTo: this.ticker,
              params: {
                  volumeSeriesID: 'volume'
              },
              dataLabels: {
                  enabled: false
              },
              zoneLines: {
                  enabled: false
              }
          }, {
              type: 'sma',
              linkedTo: this.ticker,
              zIndex: 1,
              marker: {
                  enabled: false
              }
          }]

          }
         
      });

  
  
  
  
  }


  
}
