import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Election } from 'src/app/models/election';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges{

  @Input()
  public election: Election;

  public chartType: string = 'horizontalBar';

  public chartDatasets: Array<any>; 
  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  

  constructor() {
    
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    
    let data = [];
    this.chartLabels = [];
    let sorted = this.election.candidat.sort((a, b) => {
      if(a.nb_votes > b.nb_votes){
        return -1;
      }
      else
        return 1;
    });
    sorted.forEach(c => {
      
      data.push(c.nb_votes);
      
      this.chartLabels.push(c.nom);
    });
    
    this.chartDatasets = [
      {
        data,
        label: 'Nombre de votes'
      }
    ];
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
