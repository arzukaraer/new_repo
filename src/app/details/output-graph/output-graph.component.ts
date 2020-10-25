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
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  
  constructor(private outputGraphService: OutputGraphService,
              private route: ActivatedRoute) { }

  ngOnInit():void{


      }

    }