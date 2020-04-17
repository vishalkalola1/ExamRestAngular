import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/datamodel/Exam';
import { ExamService } from 'src/app/services/exam.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {

  title : string = ''
  buttonTitle : string = ''
  exam : Exam = new Exam()
  edit : Boolean = false

  constructor(private examservice : ExamService, private router:Router, private location: Location, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.exam = JSON.parse(params.special)
      }
      this.edit = !(params && params.special)
      this.title = this.edit ? 'Add Exam' : 'Edit Exam'
      this.buttonTitle = this.edit ? 'Add' : 'Update'
    });
  }

  ngOnInit(): void {
  }

  submit(){
    this.edit ? this.add() : this.editfn()
  }

  add(){
    console.log("Add")
    this.examservice.setUrl("createExam")
    this.examservice.post(this.exam,(exam:Exam)=> {
      this.showAlert(exam)
    });
  }

  showAlert(exam : Exam){
    if(exam.error == null){
      alert("Exam " + (this.edit ? "Added" : "Edited") + " Successfully...")
      this.location.back()
    }
  }

  editfn(){
    console.log("Edit")
    this.examservice.setUrl("updateExam")
    this.examservice.post(this.exam,(exam:Exam)=> {
      this.showAlert(exam)
    });
  }
}
