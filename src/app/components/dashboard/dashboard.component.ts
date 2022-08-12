import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from "chart.js";
import {ElevesService} from "../../service/eleves.service";
import {EvaluationService} from "../../service/evaluation.service";
import {ClassesService} from "../../service/classes.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartId!:any
  chartTopFive:any
  nombreEleves:number = 0
  mostFrequentEvaluation:number = 0
  avgEvaluation: number =0;
  labels:string[]=[]
  values:number[] =[]
  nomEleves:string[]=[]
  noteEleves:number[] = []
  constructor(private eleveService:ElevesService,
              private evaluationService:EvaluationService,
              private classeService:ClassesService) { }
  title = 'Tableau de bord';
  ngOnInit(): void {
    this.chartId = document.getElementById('my_first_chart');
    this.chartTopFive = document.getElementById('chartTopFive');
    Chart.register(...registerables);
    this.getCountEleves()
    this.getMostFrequentEvaluation()
    this.getAverageEvaluation()
    this.getElevesByClasse()
    this.getTopFive()
  }


  getCountEleves(){
    this.eleveService.getCountEleves().subscribe(
      data=>{
        this.nombreEleves= data
      }
    )
  }

  getMostFrequentEvaluation(){
    this.evaluationService.getMostFrequentEvaluation().subscribe(
      data=>{
        this.mostFrequentEvaluation= data
      }
    )
  }

  getAverageEvaluation(){
    this.evaluationService.getAverageEvaluation().subscribe(
      data=>{
        this.avgEvaluation= data
      }
    )
  }
  getTopFive(){
    this.evaluationService.getToFiveScore().subscribe(
      data=>{
        data.forEach(eleve=>{
          this.nomEleves.push(eleve.substring(0,eleve.indexOf(',')))
          this.noteEleves.push(parseInt(eleve.substring(eleve.indexOf(',')+1)))
        })
      //  charte top 5
        new Chart(this.chartTopFive, {
          type: "bar",
          data: {
            labels: this.nomEleves,
            datasets: [{
              label: 'Top 5 des meilleures notes',
              data: this.noteEleves,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    )
  }

   getElevesByClasse(){
     this.classeService.getElevesByClasse().subscribe(
      data=>{
        data.forEach(classe=>{
          let label = classe.substring(0,classe.indexOf(','))
          let value = classe.substring(classe.indexOf(',')+1)
          this.labels.push(label)
          this.values.push(parseInt(value))
        })
        // charte nombre eleves par classe

        new Chart(this.chartId, {
          type: "line",
          data: {
            labels: this.labels,
            datasets: [{
              label: 'Nombre d\'élèves par classe',
              data: this.values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      }
    )
  }
}
