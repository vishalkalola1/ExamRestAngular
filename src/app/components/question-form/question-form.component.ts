import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/datamodel/Question';
import { Exam } from 'src/app/datamodel/Exam';
import { ExamService } from 'src/app/services/exam.service';
import { MCQChoice } from 'src/app/datamodel/MCQChoice';
import { QuestionService } from 'src/app/services/question.service';
import { McqchoicesService } from 'src/app/services/mcqchoices.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  isShowDiv : boolean = false
  isSingle : boolean = true
  selectedOption : number = -1
  selectedOptionTrue : number = -1
  exams : Exam[] = []
  question : Question = new Question()
  choices : MCQChoice[] = [];
  choice : MCQChoice = new MCQChoice()

  constructor(private examservice : ExamService, private questionservice : QuestionService, private mcqchoiceservice : McqchoicesService, private location: Location) {
    this.getAll()
  }

  ngOnInit(): void {
  }

  getAll(){
    this.examservice.setUrl("getAllExam")
    this.examservice.getAll((exam:Exam[]) => {
      if(exam != null && exam.length > 0){
        this.exams = exam
      }
    })
  }


  submit() {
    if (this.selectedOption == -1 || this.question.title == null){
      return 
    }

    if(this.isSingle == false){
      if(this.choices.length == 0){
        return
      }
    }

    this.question.type = this.isSingle ? "single" : "mcq"
    let examTemp = this.exams[this.selectedOption-1]
    this.question.exam = examTemp
    this.questionservice.setUrl("createQuestion")
    this.questionservice.post(this.question,(question:Question)=> {
      if(question.error == null){
        if(question.type == "mcq"){
          this.insertchoices(question)
        }else{
          this.showAlert()
        }
      }
    });
  }

  insertchoices(question:Question){
    for( var obj of this.choices){
      let questiontemp = new Question()
      questiontemp.id = question.id
      questiontemp.title  = question.title
      questiontemp.exam = question.exam
      questiontemp.type = question.type
      obj.question = questiontemp
    }
    console.log(this.choices)
    this.mcqchoiceservice.setUrl("addChoice")
    this.mcqchoiceservice.postArray(this.choices,(choicesTemp:MCQChoice[])=> {
        if(choicesTemp.length > 0){
          this.showAlert()
        }
    });
  }


  showAlert(){
    alert("Question Added Successfully...")
    this.location.back()
  }

  addOption(){

    if(this.choice.choice == null || this.selectedOptionTrue == -1){
      return
    }

    let valid = this.selectedOptionTrue == 0 ? true : false
    console.log(valid)
    let mcqchoice: MCQChoice = new MCQChoice(null,this.choice.choice,null,valid,this.question)
    this.choices.push(mcqchoice)
    this.choice.choice = null
    this.choice.valid = false
    this.selectedOptionTrue = -1
  }

  radioClick(){
    this.isShowDiv = !this.isSingle
  }
}
