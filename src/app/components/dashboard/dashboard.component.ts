import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {ElevesService} from "../../service/eleves.service";
import {EvaluationService} from "../../service/evaluation.service";
import {ClassesService} from "../../service/classes.service";
import {User} from "../../model/user";
import {ParentService} from "../../service/parent.service";
import {EleveModelGet} from "../../model/eleve-model-get";
import {EvaluationModelGet} from "../../model/evaluation-model-get";
import {ProfesseursService} from "../../service/professeurs.service";
import {NotificationsService} from "../../service/notifications.service";
import {Constants} from "../../enum/constants";

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
  eleves: EleveModelGet[] =[]
  evaluations : EvaluationModelGet[] =[]
  messageStatEleve!:string
  messageavg!:string
  messageMostFrequentScore!:string
  lisEvaluations:EvaluationModelGet[] = []
  user:User = JSON.parse(localStorage.getItem('user')!)
  constructor(private eleveService:ElevesService,
              private evaluationService:EvaluationService,
              private classeService:ClassesService,
              private parentService : ParentService,
              private notificationService: NotificationsService,
              private professeurService: ProfesseursService) { }
  title = 'Tableau de bord';
  stat!: number;
  ngOnInit(): void {
    this.chartId = document.getElementById('my_first_chart');
    this.chartTopFive = document.getElementById('chartTopFive');
    Chart.register(...registerables);
    this.getCountEleves()
    this.getMostFrequentEvaluation()
    this.getAverageEvaluation()
    if (this.user.role == 'ROLE_ADMIN'){
      this.getElevesByClasse()
      this.getTopFive()
    }
    if (this.user.role == 'ROLE_PARENT'){
      this.getElevesByParent()
    }
    if (this.user.role == 'ROLE_ELEVE'){
      this.getMyBestScore()
      this.getMyAverage()
      this.getMyFrequentScore()
      this.getMyAllEvaluations()
    }
  }

  // Statistique si role est ELEVE
  getMyBestScore(){
    this.eleveService.getMyBestScore(this.user.id ).subscribe({
      next:(score)=> {
        this.nombreEleves = score
        if(this.nombreEleves == null){
          this.messageStatEleve = 'Pas encore de note !!!'
        }else{
          this.messageStatEleve = 'Plus grande note'
        }
      }
    })
  }
  getMyAverage(){
    this.eleveService.getMyBestAverage(this.user.id).subscribe({
      next: (avg)=>{
        this.avgEvaluation = avg
        if(this.avgEvaluation == null){
          this.messageavg = 'Pas encore de note !!!'
        }else{
          this.messageavg = 'Moyenne général'
        }
      }
    })
  }

  getMyFrequentScore(){
    this.eleveService.getMyFrequentScore(this.user.id).subscribe({
      next: (score)=>{
        this.mostFrequentEvaluation = score
        if(this.mostFrequentEvaluation == null){
          this.messageMostFrequentScore = 'Pas encore de note !!!'
        }else{
          this.messageMostFrequentScore = 'Note Fréquente'
        }
      }
    })
  }
  // Statistique si role est PARENT
  getElevesByParent(){
    let userId = this.user.id
    this.eleveService.getElevesByParent(userId).subscribe({
      next: data => {
        this.eleves = data._embedded.eleves
      }
    })
  }
  getCountEleves(){
    if (this.user.role == 'ROLE_PARENT'){
      this.parentService.getCountElevesByParent(this.user.id).subscribe(
        data=>{
          this.nombreEleves= data
        }
      )
    }else if(this.user.role == 'ROLE_ADMIN'){
      this.eleveService.getCountEleves().subscribe(
        data=>{
          this.nombreEleves= data
        }
      )
    }else if(this.user.role == 'ROLE_PROFESSEUR'){
      this.professeurService.getManagedEleve(this.user.id).subscribe({
        next:(data)=> this.nombreEleves = data
      })
    }

  }

  getMyAllEvaluations(){
    let userId = this.user.id;
    this.eleveService.getEleve(userId).subscribe({
      next:(data)=>{
        this.lisEvaluations = data.evaluations
        console.log(this.lisEvaluations[0]?.matiere)
      }
    })
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

  getStats() {
    let parentId = this.user.id
    this.parentService.getStatsEleve(parentId,this.stat).subscribe({
      next:(data)=>{
        this.evaluations = data
        this.evaluations.forEach(evaluation=>{
          this.noteEleves.push(evaluation.note)
          if (evaluation.matiere.libelle != null) {
            this.labels.push(evaluation.matiere.libelle)
          }
        })
        // mise en place des stats de l'eleve
        var chartExist = Chart.getChart(this.chartTopFive)
        if (chartExist != undefined){
          chartExist.destroy()
        }
        new Chart(this.chartTopFive, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: [{
              label: 'Note de l\'élève',
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
      },
      error:(error)=>this.notificationService.successOrFailOperation(error.error.message,Constants.ERROR_STYLE,'')
    })
  }
}
