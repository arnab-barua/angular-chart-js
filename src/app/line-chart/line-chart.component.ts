import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';
import * as annotations from 'chartjs-plugin-annotation';

@Component({
   selector: 'app-line-chart',
   templateUrl: './line-chart.component.html',
   styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
   
   @ViewChild(BaseChartDirective, { static: true }) private chart: BaseChartDirective;



   chartOptions: ChartOptions | any = {

      responsive: true,
      animation: {
         duration: 0
      },
      hover: {
         mode: 'nearest',
         onHover: (event, active) => {
            this.showHideDirection(active);
         }
      },

      annotation: {
         annotations: [ ]
      },

      tooltips: {
         enabled: true,
         mode: 'nearest'
      },

      scales: {
         xAxes: [
            {
               type: 'category', 
               display: true,
               position: 'bottom',
               id: 'x-axis-0',
               ticks: {
                  beginAtZero: true
               }

            }
         ],
         yAxes: [
            {
               type: 'linear', 
               display: true,
               position: 'left',
               id: 'y-axis-1',
               ticks: {
                  beginAtZero: true
               }

            },
            {
               type: 'linear', 
               display: true,
               position: 'right',
               id: 'y-axis-2',
               ticks: {
                  beginAtZero: true
               },

               // grid line settings
               gridLines: {
                  drawOnChartArea: false // only want the grid lines for one axis to show up
               },
            }
         ],
      }
   };


   chartData = [
      {
         fill: false,
         lineTension: 0,
         data: [80, 55, 105, 70],
         label: 'Account A',
         yAxisID: 'y-axis-1'
      },
      {
         fill: false,
         lineTension: 0,
         data: [25, 60, 30, 45],
         label: 'Account B',
         yAxisID: 'y-axis-2'
      }
   ];
   chartLabels = ["January", "February", "March", "April"];

   defaultAnnotation = {
      type: "line",
      mode: "vertical",
      id: 'a-line-1',
      scaleID: "x-axis-0",
      value: 2,
      borderWidth: 2,
      borderColor: "green",
      label: {
         content: "X Axis ",
         enabled: true,
         position: "top"
      }
   };

   constructor() {
      BaseChartDirective.registerPlugin(annotations);
   }

   ngOnInit() {

   }


   showHideDirection(active: any) {
      if (active.length > 0) {
         console.clear();
         this.showDirectionLine(active);
      }
      else {
         this.hideDirectionLine()
      }
   }

   private hideDirectionLine() {
      this.chartOptions.annotation = {
         annotations: []
      };

      this.chart.chart.config.options = { ...this.chartOptions };
      this.chart.ngOnChanges({});
   }


   private showDirectionLine(active: any) {

      // Draw vertical direction line
      var _index = active[0]._index;
      var vAnnotation = { ...this.defaultAnnotation };
      vAnnotation.label = { ...this.defaultAnnotation.label };
      vAnnotation.value = _index;
      vAnnotation.id = 'a-line-2';
      vAnnotation.label.content = "X Axis";

      // Draw horizontal direction line
      var hAnnotation = { ...this.defaultAnnotation };
      hAnnotation.label = { ...this.defaultAnnotation.label };
      hAnnotation.mode = "horizontal";
      hAnnotation.id = 'a-line-3';

      // If first dataset point is hovered
      if (active[0]._datasetIndex == 0) {
         var dt1 = this.chartData[0].data[_index];
         hAnnotation.value = dt1;
         hAnnotation.borderColor = "yellow";
         hAnnotation.scaleID = "y-axis-1";
         hAnnotation.label.content = "<-- Left Y Axis";
      }
      else {
         var dt1 = this.chartData[1].data[_index];
         hAnnotation.value = dt1;
         hAnnotation.borderColor = "black";
         hAnnotation.scaleID = "y-axis-2";
         hAnnotation.label.content = "Right Y Axis -->";
      }



      var allAnnotations = [];
      allAnnotations.push(vAnnotation);
      allAnnotations.push(hAnnotation);

      this.chartOptions.annotation = {
         annotations: allAnnotations
      };

      this.chartOptions.tooltips.enabled = true;
      this.chart.chart.config.options = { ...this.chartOptions };
      this.chart.ngOnChanges({});
   }



}
