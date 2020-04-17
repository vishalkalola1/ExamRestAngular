import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/datamodel/Exam';
import { ExamService } from 'src/app/services/exam.service';
import { Router, NavigationExtras } from '@angular/router';
import { Question } from 'src/app/datamodel/Question';
import { QuestionService } from 'src/app/services/question.service';
import { MCQChoice } from 'src/app/datamodel/MCQChoice';
import { McqchoicesService } from 'src/app/services/mcqchoices.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  ItemsArray : Exam[] = []
  title : string = "Exam"
  exam : Exam = new Exam()

  questions : Question[] = []
  choices : MCQChoice[] = []

  constructor(private examservice:ExamService, private router:Router, private questionService : QuestionService, private choicesservice : McqchoicesService) {
    this.getAll()
  }

  ngOnInit(): void {
  }

  add(){
    if(this.title == 'Exam'){
      this.router.navigate(["/formEditAdd"])
    }else{
      this.router.navigate(["/formQuestion"])
    }
  }

  edit(event:Event){
    let elementId : string = (event.target as Element).id;
    if(this.title == 'Exam'){
      this.editEpita(elementId)
    }else{
      this.editQuestion(elementId)
    }
  }

  editEpita(elementId:string){
    let exam : Exam = this.ItemsArray.filter(x => x.id === Number(elementId))[0];
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(exam)
        }
      };
    this.router.navigate(["/formEditAdd"],navigationExtras)
  }

  editQuestion(elementId:string){
    this.choicesservice.setUrl("choices/"+elementId)
    this.choicesservice.getAll((choices:MCQChoice[])=> {
      if(choices.length > 0){
        console.log(choices)
        this.choices = choices
      }
    });
  }

  delete(event:Event){
    if(confirm("Are you sure you want to delete")){
      let elementId : string = (event.target as Element).id;
      if(this.title == 'Exam'){
        this.deleteExam(elementId)
      }else{
        this.deleteQuestion(elementId)
      }
    }
  }

  deleteExam(elementId:string){
    this.examservice.setUrl("deleteExam")
    let exam : Exam = this.ItemsArray.filter(x => x.id === Number(elementId))[0];
    this.examservice.post(exam,(exam:Exam)=> {
      if(exam.error == null){
        let exam1 : Exam = this.ItemsArray.filter(x => x.id === exam.id)[0];
        this.ItemsArray.splice(this.ItemsArray.indexOf(exam1), 1);
      }
    });
  }

  deleteQuestion(elementId:string){
    this.questionService.setUrl("deleteQuestion")
    let question : Question = this.questions.filter(x => x.id === Number(elementId))[0];
    console.log(question)
    this.questionService.post(question,(question:Question)=> {
      if(question.error == null){
        let questionlocal : Question = this.questions.filter(x => x.id === question.id)[0];
        this.questions.splice(this.questions.indexOf(questionlocal), 1);
      }
    });
  }

  getAll(){
    this.examservice.setUrl("getAllExam")
    this.examservice.getAll((exam:Exam[]) => {
      if(exam != null && exam.length > 0){
        this.ItemsArray = exam
        this.getAllQuestion()
      }
    })
  }

  getAllQuestion(){
    this.questionService.setUrl("getAllQuestion")
    this.questionService.getAll((questions:Question[]) => {
      if(questions != null && questions.length > 0){
        this.questions = questions
      }
    })
  }

  examClick(){
    this.title = "Exam"
    this.choices = []
  }

  questionClick(){
    this.title = "Question"
    this.choices = []
  }

  logout(){
    localStorage.clear()
    this.router.navigate(["/"])
  }
}
