import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {QuestionService } from '../service/question.service';
import{CommonModule}from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule ,MatStepperModule, MatButtonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{

  public name: string ="";
  public questionList: any = []; 
  public currentQuestion: number = 0;
  public points: number =0;
  counter = 108;
  correctAnswer:number = 0;
  inCorrectAnswer:number = 0;
  image: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;

constructor( private questionService: QuestionService, private router: Router) {}

ngOnInit(): void {
  this.name = localStorage.getItem('name')!;
  this.getAllQuestions();
  this.startCounter();
}
getAllQuestions() {
  this.questionService.getQuestionsJson().subscribe((res) => {
this.questionList = res.questions;
  });
}
nextQuestion() {
  if (this.currentQuestion < this.questionList.length - 1) {
    this.currentQuestion++;
  } else {
    this.isQuizCompleted = true; 
    this.stopCounter(); 
    console.log('Quiz completed!');
  }
}
previousQuestion() {  
 this.currentQuestion--;
}

selectOption(currentQno: number, option: any) {
  if (currentQno + 1 === this.questionList.length) {
    console.log('Quiz completed!');
    this.isQuizCompleted = true; 
    this.stopCounter(); 
    return; 
   }
  this.questionList[currentQno].options.forEach((opt: any) => (opt.selected = false));
  option.selected = true;
  if (option.correct) {
    this.points += 10; 
    this.correctAnswer++; 
    this.questionList[currentQno].showExplanation = true;

  } else {
    this.inCorrectAnswer++; 
    this.questionList[currentQno].showExplanation = false; 
  }

  this.getProgressPercent();
}

startCounter() { 
  this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 108;
        this.points -= 10;
      }
    };

stopCounter() {
  this.counter = 0;
}
resetCounter() {
  this.stopCounter();
  this.counter = 108;
  this.startCounter();
}

resetQuiz(){
  this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

}

getProgressPercent() {
  this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
  return this.progress;
}

startQuiz() {
  this.isQuizCompleted = false; 
  this.points = 0; 
  this.correctAnswer = 0; 
  this.inCorrectAnswer = 0; 
  this.currentQuestion = 0; 
  this.getProgressPercent(); 
  this.startCounter(); 
  this.getAllQuestions(); 
}


goToHome() {
  this.router.navigate(['/welcome']); 
}

}
