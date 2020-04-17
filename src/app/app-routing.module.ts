import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ExamFormComponent } from './components/exam-form/exam-form.component';
import { Exam } from './datamodel/Exam';
import { QuestionFormComponent } from './components/question-form/question-form.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:LoginFormComponent},
  {path:'admin', component:LoginFormComponent},
  {path:'register', component: RegisterFormComponent},
  {path:'adminhome', component:AdminHomeComponent},
  {path:'formEditAdd', component:ExamFormComponent},
  {path:'formQuestion', component:QuestionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
